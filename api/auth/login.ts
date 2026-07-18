import { head, put } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const userPath = `users/${email}.json`;
    
    try {
      await head(userPath);
    } catch (error: any) {
      console.log("[Login] User not found in blob", email);
      return res.status(404).json({ error: "Account not found" });
    }

    const sessionToken = crypto.randomUUID();
    const sessionPath = `sessions/${sessionToken}.json`;
    await put(sessionPath, JSON.stringify({ email, createdAt: new Date().toISOString() }), {
      access: "private",
      addRandomSuffix: false
    });

    return res.status(200).json({ success: true, sessionToken });
  } catch (error) {
    console.error("[Login] Unexpected error:", error);
    return res.status(500).json({ error: "Unexpected failure" });
  }
}
