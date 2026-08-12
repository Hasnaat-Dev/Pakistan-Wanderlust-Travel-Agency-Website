import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      server: { entry: "server" },
    }),
    // Builds a deployable server bundle. "node-server" works on most hosts
    // (Node, Docker, Railway, Render, a VPS, etc). Swap the preset if you're
    // deploying to Vercel, Netlify, or Cloudflare — see the Nitro docs.
    nitro({ preset: "node-server" }),
    viteReact(),
  ],
});
