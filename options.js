var save_options = () => {
    chrome.storage.sync.set({"onOffTesting": document.getElementById('color').value},function() {
        chrome.storage.sync.get('onOffTesting',function(result){
            console.log("save",result.onOffTesting)
        });
    });
}

var restore_options = () => {
    chrome.storage.sync.get('onOffTesting',function(result){
        if(result.onOffTesting) {
            document.getElementById('color').value = result.onOffTesting
        } else {
            chrome.storage.sync.set({"onOffTesting" : "on"},function() {
                chrome.storage.sync.get('onOffTesting',function(result){
                    console.log("done int",result.onOffTesting)
                });
            });

        }
        });

    } 


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);