import { del } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { sessionToken } = req.body;
    if (!sessionToken) {
      return res.status(400).json({ error: "Session token is required" });
    }

    const sessionPath = `sessions/${sessionToken}.json`;
    await del(sessionPath);

    return res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    console.error("[Logout] Unexpected error:", error);
    return res.status(500).json({ error: "Unexpected failure" });
  }
}
