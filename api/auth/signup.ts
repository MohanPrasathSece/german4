import { head, put } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, country } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: "Email and name are required" });
    }

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
