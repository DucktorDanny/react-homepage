chrome.tabs.onCreated.addListener((tab) => {
   console.log('New tab created...');
   console.log('Opened tab: ', tab.pendingUrl);
   const originalStartPage = 'chrome://startpageshared/';

   if (tab.pendingUrl === originalStartPage) {
      chrome.tabs.update(tab.id, {
         url: 'index.html'
      });
   }
})