checkSite = n => {
    chrome.storage.sync.get('onOffTesting',function(result){
        if(result.onOffTesting !== "off") {
            let matchClass = '.skipElement'
            if(window.location.origin.includes('netflix')) {
                matchClass = '.skip-credits'
            } 
            if (n.nodeType === 1 && n.matches(matchClass)) {
                skip(n,matchClass)
            }	
        }
    })
	
}

checkAddedNodes = n => n.addedNodes.forEach(checkSite);

skip = (n, m) => {
    if (m === '.skip-credits') {
        doClick(n).then(doGetPlayButton());
    } else {
        n.click();
    }
}

function doClick(n) {
    return new Promise(function(resolve) {
        resolve(n.firstChild.click());
    });
}

function doGetPlayButton() {
    var c = document.getElementsByClassName("PlayerControlsNeo__button-control-row");
    var d = c.item(0)
    if(d.parentNode.classList.contains("PlayerControlsNeo__bottom-controls--faded")){
        d.firstChild.click()
    }
}

const obs = new MutationObserver(m => m.map(checkAddedNodes));

obs.observe(document.documentElement, { childList: true, subtree: true });