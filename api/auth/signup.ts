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
    const crmUrl = process.env.CRM_URL;
    const crmToken = process.env.CRM_TOKEN;

    if (crmUrl && crmToken) {
      try {
        const crmRes = await fetch(crmUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${crmToken}`
          },
          body: JSON.stringify({
            first_name: name.split(" ")[0],
            last_name: name.split(" ").slice(1).join(" ") || "User",
            email: email,
            phone: phone,
            country: country
          })
        });
        
        if (!crmRes.ok) {
          console.warn("[Signup] CRM submission failed with status:", crmRes.status);
          // Depending on requirements, we might want to fail the signup if CRM fails.
          // For now, we will throw an error to fail the signup as requested: "Only continue Blob signup if CRM..."
          return res.status(400).json({ error: "CRM submission failed" });
        }
      } catch (crmError) {
        console.error("[Signup] CRM request error:", crmError);
        return res.status(400).json({ error: "Could not connect to CRM" });
      }
    }

    // 2. Vercel Blob Signup
    const userPath = `users/${email}.json`;
    
    try {
      // Check if user already exists
      await head(userPath);
      return res.status(409).json({ error: "Account already exists" });
    } catch (error: any) {
      // User doesn't exist, proceed to create
    }

    // Save user profile to Blob
    await put(userPath, JSON.stringify({ name, email, phone, country, createdAt: new Date().toISOString() }), {
      access: "public",
      addRandomSuffix: false
    });

    // Create session token
    const sessionToken = crypto.randomUUID();
    const sessionPath = `sessions/${sessionToken}.json`;
    await put(sessionPath, JSON.stringify({ email, createdAt: new Date().toISOString() }), {
      access: "public",
      addRandomSuffix: false
    });

    return res.status(200).json({ success: true, sessionToken, message: "Account created" });
  } catch (error) {
    console.error("[Signup] Unexpected error:", error);
    return res.status(500).json({ error: "Unexpected failure" });
  }
}
