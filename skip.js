checkSite = n => {
    chrome.storage.sync.get('onOffTesting',function(result){
        console.log(result.onOffTesting)
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
        n.firstChild.click();
    } else {
        n.click();
    }

}

const obs = new MutationObserver(m => m.map(checkAddedNodes));

obs.observe(document.documentElement, { childList: true, subtree: true });