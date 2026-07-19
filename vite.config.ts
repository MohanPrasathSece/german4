import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { head, put } from "@vercel/blob";

// Simple middleware to handle Vercel Blob Auth routes locally during `vite dev`
const vercelBlobLocalAuth = (env: Record<string, string>) => {
  return {
    name: "vercel-blob-local-auth",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        // Parse JSON body helper
        const getBody = (request: any) => {
          return new Promise((resolve) => {
            let body = '';
            request.on('data', (chunk: any) => {
              body += chunk.toString();
            });
            request.on('end', () => {
              try {
                resolve(JSON.parse(body));
              } catch (e) {
                resolve({});
              }
            });
          });
        };

        if (req.url === "/api/auth/signup" && req.method === "POST") {
          try {
            const body: any = await getBody(req);
            const { name, email, phone, country } = body;
            if (!email || !name || !phone) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ error: "Email, name, and phone are required" }));
            }

            const crmUrl = env.CRM_API_URL;
            const crmToken = env.CRM_AUTH_TOKEN;

            if (crmUrl && crmToken) {
              try {
                console.log("Local [Signup] Sending to CRM", { email, phone });
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
                console.log(`Local [Signup] CRM Status: ${crmRes.status}`, crmText);

                const bodyStr = crmText.toLowerCase();
                const isDuplicate = bodyStr.includes('already') || bodyStr.includes('exist') || (bodyStr.includes('duplicate') && !bodyStr.includes('"duplicate":false'));

                if (!crmRes.ok && !isDuplicate) {
                  console.warn("Local CRM submission failed:", crmRes.status);
                  // Allow signup to continue even if CRM fails, but don't increment dashboard
                } else if (!isDuplicate) {
                  console.log("Local [Signup] Incrementing Lead Dashboard");
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
                    console.error("Local [Signup] Dashboard increment failed", e);
                  }
                }
              } catch (crmError) {
                console.error("Local CRM request error:", crmError);
                // Allow signup to continue even if CRM is down
              }
            }

            const userPath = `users/${email}.json`;
            try {
              await head(userPath, { token: env.BLOB_READ_WRITE_TOKEN });
              res.statusCode = 409;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ error: "Account already exists" }));
            } catch (error) {
               // User doesn't exist
            }

            await put(userPath, JSON.stringify({ name, email, phone, country, createdAt: new Date().toISOString() }), {
              access: "public",
              addRandomSuffix: false,
              token: env.BLOB_READ_WRITE_TOKEN
            });

            const sessionToken = crypto.randomUUID();
            const sessionPath = `sessions/${sessionToken}.json`;
            await put(sessionPath, JSON.stringify({ email, createdAt: new Date().toISOString() }), {
              access: "public",
              addRandomSuffix: false,
              token: env.BLOB_READ_WRITE_TOKEN
            });

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ success: true, sessionToken, message: "Account created" }));
          } catch (error: any) {
            console.error("Local Mock Signup Error:", error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ error: error.message || "Unexpected failure" }));
          }
        } 
        
        else if (req.url === "/api/auth/login" && req.method === "POST") {
          try {
            const body: any = await getBody(req);
            const { email } = body;
            if (!email) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ error: "Email is required" }));
            }

            const userPath = `users/${email}.json`;
            try {
              await head(userPath, { token: env.BLOB_READ_WRITE_TOKEN });
            } catch (error) {
              res.statusCode = 401;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ error: "Account not found" }));
            }

            const sessionToken = crypto.randomUUID();
            const sessionPath = `sessions/${sessionToken}.json`;
            await put(sessionPath, JSON.stringify({ email, createdAt: new Date().toISOString() }), {
              access: "public",
              addRandomSuffix: false,
              token: env.BLOB_READ_WRITE_TOKEN
            });

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ success: true, sessionToken, message: "Logged in" }));
          } catch (error: any) {
            console.error("Local Mock Login Error:", error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ error: error.message || "Unexpected failure" }));
          }
        }
        
        else if (req.url === "/api/auth/logout" && req.method === "POST") {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ success: true, message: "Logged out" }));
        }

        next();
      });
    }
  };
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), vercelBlobLocalAuth(env)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
