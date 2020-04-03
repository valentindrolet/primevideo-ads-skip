function bottomPanelFound(bottomPanels) {
  const bottomPanelObserver = new MutationObserver(bottomPanelMutated);
  bottomPanelObserver.observe(bottomPanels, { childList: true, subtree: true });
}

async function bottomPanelMutated() {
  const adSkipButtons = document.getElementsByClassName('adSkipButton skippable');

  if (adSkipButtons.length > 0) {
    await new Promise(x => setTimeout(x, 100));
    adSkipButtons[0].click();
  }
}

function dvWebPlayerMutated() {
  const bottomPanels = document.getElementsByClassName('bottomPanel');

  if (bottomPanels.length > 0) {
    dvWebPlayerObserver.disconnect();
    bottomPanelFound(bottomPanels[0]);
  }
}

function putCollectionsFirst() {
  var mainDiv = document.getElementById("aiv-cl-main-middle");
  var firstCollectionDiv = document.getElementsByClassName('_1gQKv6 u-collection tst-collection')[0];

  if (mainDiv && firstCollectionDiv) {
    mainDiv = mainDiv.firstElementChild;
    for (var i = collectionsTitlesToPutFirst.length - 1; i >= 0; i--) {
      const collectionDiv = document.evaluate("//h2[" + collectionsTitlesToPutFirst[i] + "]/ancestor::div[@class='_1gQKv6 u-collection tst-collection']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (collectionDiv){
        mainDiv.insertBefore(collectionDiv, firstCollectionDiv);
        firstCollectionDiv = collectionDiv;
      }
    }
  }
}

function concatXPathContains(elements) {
  var concatenated = '';
  elements.forEach(t => concatenated += (concatenated.length === 0 ? '' : ' or ') + "contains(.,'" + t + "')");
  return concatenated;
}

const dvWebPlayerObserver = new MutationObserver(dvWebPlayerMutated);
dvWebPlayerObserver.observe(document.getElementById('dv-web-player'), { childList: true, subtree: true });

const collectionsTitlesToPutFirst = [
  concatXPathContains(['Watch next TV and movies', 'Vos programmes - Séries et films']),
  concatXPathContains(['Recommended movies', 'Films recommandés pour vous'])
];
putCollectionsFirst();