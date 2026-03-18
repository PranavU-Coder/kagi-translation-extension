import { KagiUrl, type TranslateMode } from "../utils/kagi";

export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        id: "kagi-parent",
        title: "Translate",
        contexts: ["selection"],
      });
      chrome.contextMenus.create({
        id: "kagi-plain",
        parentId: "kagi-parent",
        title: "  To Plain English",
        contexts: ["selection"],
      });
      chrome.contextMenus.create({
        id: "kagi-linkedin",
        parentId: "kagi-parent",
        title: "  To LinkedIn English",
        contexts: ["selection"],
      });
    });
  });

  chrome.contextMenus.onClicked.addListener((info) => {
    const text = info.selectionText?.trim();
    if (!text) return;

    const mode: TranslateMode | null =
      info.menuItemId === "kagi-plain"
        ? "plain"
        : info.menuItemId === "kagi-linkedin"
          ? "linkedin"
          : null;
    if (!mode) return;

    // turns out different browsers behave differently or idk smthg
    const api = typeof browser !== "undefined" ? browser : chrome;
    api.tabs.create({ url: KagiUrl(text, mode) });
  });
});
