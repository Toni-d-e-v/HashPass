

browser.contextMenus.create({
        id: "HashPass",
        title: "Hash your Pass!",
        contexts: ["selection"]

});

browser.contextMenus.onClicked.addListener(function(info, tab) {
        switch (info.menuItemId) {
          case "HashPass": 
            let hash = cyrb53(info.selectionText);
            console.log(hash);
            do_pass(hash);
            break;
        }
})

const cyrb53 = function(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1>>>0);
};


const passwords = ["password", "passwd","pass","loginPassword","vpassword"];

// for each password console.log(password)

passwords.forEach(function(password) {
        var id = password;
        console.log(id);
        browser.tabs.executeScript({
                code: "document.getElementById('" + id + "').type = Text"
        });  
        console.log("changed to the new input");
});

function set_pass(id,pass) {
 
        browser.tabs.executeScript({
                code: "document.getElementById('" + id +  "').value = " + pass + ";"
        });  
        passwords.forEach(function(password) {
                var id = password;
                console.log(id);
                browser.tabs.executeScript({
                        code: "document.getElementById('" + id + "').type = 'password'"
                });  
                console.log("changed to the old input");
        });
        
}






// for 
function do_pass(pass) {
    for (var i = 0; i < passwords.length; i++) {
            var password = passwords[i];
            var id = password;
            set_pass(id,pass);
    }
}

