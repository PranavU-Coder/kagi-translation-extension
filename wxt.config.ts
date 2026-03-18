import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  runner: {
    binaries: {
      chrome: "/usr/bin/google-chrome-stable",
    },
  },
  vite: () => ({
    esbuild: {
      jsx: "automatic",
      jsxImportSource: "preact",
    },
    resolve: {
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime",
      },
    },
  }),
  manifest: {
    name: "LinkedIn Translator",
    description:
      "Right-click selected text to translate to Plain English or LinkedIn Speak via Kagi.",
    permissions: ["contextMenus"],
    browser_specific_settings: {
      gecko: {
        id: "kagi-translate@extension",
        strict_min_version: "140.0",
        data_collection_permissions: {
          required: ["none"],
          optional: [],
        },
      } as any, // bad practices? very much but I don't care honestly
    },
  },
});
