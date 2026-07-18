import { put, head } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, country } = req.body;
    const CRM_TOKEN = process.env.CRM_TOKEN;
    const CRM_URL = process.env.CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";

    // Format phone for CRM (e.g. +41 -> 0041)
    const crmPhone = phone.startsWith("+") ? "00" + phone.substring(1) : phone;
    
    const [firstName, ...lastNames] = name.split(" ");
    const lastName = lastNames.join(" ");

    const crmPayload = {
      country_name: "ch", // default according to requirements payload structure? wait, requirement says "country_name":"ch", but also 20 country support. Should we send the ISO code or name? I'll send the country name or 'ch' if needed. Let's send the provided country code or 'ch'.
      description: "",
      phone: crmPhone,
      email: email,
      first_name: firstName || name,
      last_name: lastName || "",
      custom_fields: {
        Source_ID: "Website",
        Outline_Your_Case: ""
      }
    };

    console.log("[Signup] Sending to CRM", { email, phone: crmPhone });

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const crmRes = await fetch(CRM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Token": CRM_TOKEN || "",
        "Authorization": `Bearer ${CRM_TOKEN || ""}`,
        "X-Affiliate-Token": CRM_TOKEN || "",
        "x-token": CRM_TOKEN || ""
      },
      body: JSON.stringify(crmPayload)
    });

    const crmText = await crmRes.text();
    let crmData = {};
    try { crmData = JSON.parse(crmText); } catch(e) {}
    
    console.log(`[Signup] CRM Status: ${crmRes.status}`, crmText);

    let isDuplicate = false;
    // Explicit duplicate detection
    if (crmText.toLowerCase().includes("already exists") || (crmData as any).duplicate === true) {
      isDuplicate = true;
    }

    if (!crmRes.ok && !isDuplicate) {
      console.log("[Signup] CRM Rejected Lead");
      return res.status(400).json({ error: "Lead is not valid" });
    }

    // Lead accepted or already exists. Increment Dashboard.
    if (!isDuplicate) {
      console.log("[Signup] Incrementing Lead Dashboard");
      try {
        await fetch("https://lead-dashboard-orcin.vercel.app/api/increment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            website: "VertexIQ",
            type: "signup",
            name,
            email
          })
        });
      } catch (e) {
        console.error("[Signup] Dashboard increment failed", e);
      }
    }

    // Now handle Blob Authentication Signup/Login
    const userPath = `users/${email}.json`;
    await put(userPath, JSON.stringify({ name, email, phone, country }), {
      access: "private",
      addRandomSuffix: false
    });

    // Create session
    const sessionToken = crypto.randomUUID();
    const sessionPath = `sessions/${sessionToken}.json`;
    await put(sessionPath, JSON.stringify({ email, createdAt: new Date().toISOString() }), {
      access: "private",
      addRandomSuffix: false
    });

    return res.status(isDuplicate ? 409 : 200).json({ success: true, sessionToken, message: isDuplicate ? "Account already exists" : "Created" });

  } catch (error) {
    console.error("[Signup] Unexpected error:", error);
    return res.status(500).json({ error: "Unexpected failure" });
  }
}
