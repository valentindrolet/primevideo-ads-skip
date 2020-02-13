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

const dvWebPlayerObserver = new MutationObserver(dvWebPlayerMutated);
dvWebPlayerObserver.observe(document.getElementById('dv-web-player'), { childList: true, subtree: true });