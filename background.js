chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'saveToSmartNote',
      title: 'SmartNote’ga saqlash',
      contexts: ['selection']
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'saveToSmartNote' && info.selectionText) {
      chrome.runtime.sendMessage({
        action: 'saveNote',
        note: {
          text: info.selectionText,
          tags: [],
          url: tab.url,
          timestamp: new Date().toISOString()
        }
      });
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'SmartNote',
        message: 'Tanlangan matn eslatma sifatida saqlandi!'
      });
    }
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'saveNote') {
      chrome.storage.sync.get(['notes'], (data) => {
        const notes = data.notes || [];
        notes.push(message.note);
        chrome.storage.sync.set({ notes }, () => {
          console.log('Eslatma saqlandi:', message.note);
        });
      });
    }
  });