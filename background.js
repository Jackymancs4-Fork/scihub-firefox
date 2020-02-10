const SCIHUB_URL = 'scihub_url';
const DEFAULT_SCIHUB_URL = 'https://sci-hub.tw';
const CURRENT_URL = "current_url";
let storage = browser.storage.sync;
let config = {};

config[SCIHUB_URL] = DEFAULT_SCIHUB_URL;

function openSciHubPdf(tab, url) {

  if (tab.active) {
    // Get the CURRENT_URL configuration
    storage.get(config, function (config) {
      browser.tabs.create({
        url: config[SCIHUB_URL] + '/' + url,
      });
    })
  }
}

browser.browserAction.onClicked.addListener((tab) => openSciHubPdf(tab, tab.url));

browser.menus.create({
  id: "open-page",
  contexts: ["page"],
  title: "Open page in SciHub",
  onclick: (info, tab) => openSciHubPdf(tab, info.pageUrl)
});

browser.menus.create({
  id: "open-link",
  contexts: ["link"],
  title: "Open link in SciHub",
  onclick: (info, tab) => openSciHubPdf(tab, info.linkUrl)
});
