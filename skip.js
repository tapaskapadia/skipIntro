//parent element of what is targeted for the keyboard events
let parentClass = '.watch-video--player-view'
let skipButtonClass = '.watch-video--skip-content-button'
//Key down and Key up event for the character "s" as this skips intro when available
let key_down_event = new KeyboardEvent('keydown',{"altKey": false,"bubbles": true,"cancelBubble": false,"cancelable": true,"charCode": 0,"code": "KeyS","composed": true,"ctrlKey": false,"currentTarget": null,"defaultPrevented": true,"detail": 0,"eventPhase": 0,"isComposing": false,"isTrusted": true,"key": "s","keyCode": 83,"location": 0,"metaKey": false,"repeat": false,"returnValue": false,"shiftKey": false,"type": "keydown","which": 83})
let key_up_event = new KeyboardEvent('keyup',{"altKey": false,"bubbles": true,"cancelBubble": false,"cancelable": true,"charCode": 0,"code": "KeyS","composed": true,"ctrlKey": false,"currentTarget": null,"defaultPrevented": false,"detail": 0,"eventPhase": 0,"isComposing": false,"isTrusted": true,"key": "s","keyCode": 83,"location": 0,"metaKey": false,"repeat": false,"returnValue": true,"shiftKey": false,"type": "keyup","which": 83})
checkSite = n => {
    chrome.storage.sync.get('onOffTesting',function(result){
        if(result.onOffTesting !== "off") {
            //don't need if only support netflix
            // if(window.location.origin.includes('netflix')) {
            //     matchClass = '.watch-video--skip-content-button'
            // } 
            if (n.nodeType === 1 && n.querySelector(skipButtonClass)) {
                skip(parentClass)
            }
        }
    })
	
}

checkAddedNodes = n => n.addedNodes.forEach(checkSite);

skip = (pc) => {
    let ele = document.querySelector(pc).firstChild;
    ele.dispatchEvent(key_down_event);
    ele.dispatchEvent(key_up_event);
}


const obs = new MutationObserver(m => m.map(checkAddedNodes));

obs.observe(document.documentElement, { childList: true, subtree: true });