import { head, put } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, country } = req.body;
    if (!email || !name || !phone) {
      return res.status(400).json({ error: "Email, name, and phone are required" });
    }

    // 1. Submit lead to CRM first
    const crmUrl = process.env.CRM_API_URL;
    const crmToken = process.env.CRM_AUTH_TOKEN;

    if (crmUrl && crmToken) {
      try {
        console.log("[Signup] Sending to CRM", { email, phone });
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        const crmRes = await fetch(crmUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Token": crmToken || "",
            "Authorization": `Bearer ${crmToken || ""}`,
            "X-Affiliate-Token": crmToken || "",
            "x-token": crmToken || ""
          },
          body: JSON.stringify({
            first_name: name.split(" ")[0],
            last_name: name.split(" ").slice(1).join(" ") || "User",
            email: email,
            phone: phone,
            country: country
          })
        });
        
        const crmText = await crmRes.text();
        console.log(`[Signup] CRM Status: ${crmRes.status}`, crmText);

        const bodyStr = crmText.toLowerCase();
        const isDuplicate = bodyStr.includes('already') || bodyStr.includes('exist') || (bodyStr.includes('duplicate') && !bodyStr.includes('"duplicate":false'));

        if (!crmRes.ok && !isDuplicate) {
          console.warn("[Signup] CRM Rejected Lead:", crmRes.status);
          // Allow signup to continue even if CRM fails, but don't increment dashboard
        } else if (!isDuplicate) {
          console.log("[Signup] Incrementing Lead Dashboard");
          try {
            await fetch("https://lead-dashboard-orcin.vercel.app/api/increment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                website: "The Finance View",
                type: "signup",
                name,
                email
              })
            });
          } catch (e) {
            console.error("[Signup] Dashboard increment failed", e);
          }
        }
      } catch (crmError) {
        console.error("[Signup] CRM request error:", crmError);
        // Allow signup to continue even if CRM is down
      }
    }

    // 2. Vercel Blob Signup
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      console.warn("[Signup] BLOB_READ_WRITE_TOKEN not set - skipping blob storage");
      return res.status(200).json({ success: true, message: "Account registered" });
    }

    const userPath = `users/${email}.json`;
    
    try {
      // Check if user already exists
      await head(userPath, { token: blobToken });
      return res.status(409).json({ error: "Account already exists" });
    } catch (error: any) {
      // User doesn't exist, proceed to create
    }

    // Save user profile to Blob
    await put(userPath, JSON.stringify({ name, email, phone, country, createdAt: new Date().toISOString() }), {
      access: "public",
      addRandomSuffix: false,
      token: blobToken
    });

    // Create session token
    const sessionToken = crypto.randomUUID();
    const sessionPath = `sessions/${sessionToken}.json`;
    await put(sessionPath, JSON.stringify({ email, createdAt: new Date().toISOString() }), {
      access: "public",
      addRandomSuffix: false,
      token: blobToken
    });

    return res.status(200).json({ success: true, sessionToken, message: "Account created" });
  } catch (error) {
    console.error("[Signup] Unexpected error:", error);
    return res.status(500).json({ error: "Unexpected failure" });
  }
}
