export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, country, message } = req.body;
    const CRM_TOKEN = process.env.CRM_TOKEN;
    const CRM_URL = process.env.CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";

    const crmPhone = phone.startsWith("+") ? "00" + phone.substring(1) : phone;
    
    const [firstName, ...lastNames] = name.split(" ");
    const lastName = lastNames.join(" ");

    const crmPayload = {
      country_name: "ch", 
      description: message || "",
      phone: crmPhone,
      email: email,
      first_name: firstName || name,
      last_name: lastName || "",
      custom_fields: {
        Source_ID: "Website",
        Outline_Your_Case: message || ""
      }
    };

    console.log("[Contact] Sending to CRM", { email, phone: crmPhone });

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
    
    console.log(`[Contact] CRM Status: ${crmRes.status}`, crmText);

    let isDuplicate = false;
    if (crmText.toLowerCase().includes("already exists") || (crmData as any).duplicate === true) {
      isDuplicate = true;
    }

    if (!crmRes.ok && !isDuplicate) {
      console.log("[Contact] CRM Rejected Lead");
      return res.status(400).json({ error: "Lead is not valid" });
    }

    if (!isDuplicate) {
      console.log("[Contact] Incrementing Lead Dashboard");
      try {
        await fetch("https://lead-dashboard-orcin.vercel.app/api/increment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            website: "VertexIQ",
            type: "contact",
            name,
            email
          })
        });
      } catch (e) {
        console.error("[Contact] Dashboard increment failed", e);
      }
    }

    return res.status(isDuplicate ? 409 : 200).json({ success: true, message: isDuplicate ? "Account already exists" : "Created" });

  } catch (error) {
    console.error("[Contact] Unexpected error:", error);
    return res.status(500).json({ error: "Unexpected failure" });
  }
}
