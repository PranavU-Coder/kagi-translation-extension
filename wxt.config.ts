import { defineConfig } from 'wxt';

// supposed to be a 3kB alt to React so sounds good amirite
export default defineConfig({
  srcDir: 'src',
  vite: () => ({
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'preact',
    },
    resolve: {
      alias: {
        'react':             'preact/compat',
        'react-dom':         'preact/compat',
        'react/jsx-runtime': 'preact/jsx-runtime',
      },
    },
  }),
  manifest: ({ browser }) => ({
    name: 'Kagi Translate',
    description: 'Translate selected text to Plain English or LinkedIn Speak via Kagi',
    permissions: [
      'contextMenus',
      'activeTab',
      'scripting',
      'storage',
      ...(browser === 'chrome' ? ['sidePanel'] : []),
    ],
    // this is actually very important for testing suite
    host_permissions: [
      'https://translate.kagi.com/*',
    ],
    action: { default_title: 'Kagi Translate' },
    ...(browser === 'chrome'
      ? { side_panel: { default_path: 'sidebar.html' } }
      : {
          sidebar_action: {
            default_title: 'Kagi Translate',
            default_panel: 'sidebar.html',
            default_icon: { 48: 'icon/48.png' },
          },
        }
    ),
  }),
});