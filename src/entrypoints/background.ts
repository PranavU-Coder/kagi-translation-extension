export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        id: 'kagi-parent',
        title: 'Kagi Translate',
        contexts: ['selection'],
      });
      chrome.contextMenus.create({
        id: 'kagi-plain',
        parentId: 'kagi-parent',
        title: '✏️  Translate to Plain English',
        contexts: ['selection'],
      });
      chrome.contextMenus.create({
        id: 'kagi-linkedin',
        parentId: 'kagi-parent',
        title: '💼  Translate to LinkedIn Speak',
        contexts: ['selection'],
      });
    });

    if (chrome.sidePanel) {
      chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
    }
  });

  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (!info.selectionText || !tab?.id) return;

    const mode = info.menuItemId === 'kagi-plain' ? 'plain'
                : info.menuItemId === 'kagi-linkedin' ? 'linkedin'
                : null;
    if (!mode) return;

    const text = info.selectionText.trim();

    if (chrome.sidePanel && tab.windowId) {
      await chrome.sidePanel.open({ windowId: tab.windowId });
    }

    setTimeout(() => {
      chrome.runtime.sendMessage({
        type: 'TRANSLATE_SELECTION',
        mode,
        text,
      }).catch(() => {
        chrome.storage.session?.set({ kagi_pending: { mode, text } });
      });
    }, 350);
  });

  chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
    if (msg.type === 'GET_SELECTION') {
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        const tab = tabs[0];
        if (!tab?.id) { reply({ text: '' }); return; }

        try {
          const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => (window.getSelection()?.toString() ?? '').trim(),
          });
          reply({ text: results[0]?.result || '' });
        } catch {
          reply({ text: '' });
        }
      });
      return true; 
    }
  });
});
