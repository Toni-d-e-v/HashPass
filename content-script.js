

browser.contextMenus.create({
        id: "HashPass_v1.1",
        title: "Hash your Pass!",
        contexts: ["selection"]

});





/*  add event listeners to buttons */
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


browser.contextMenus.onClicked.addListener(function(info, tab) {
        switch (info.menuItemId) {
          case "HashPass_v1.1": 
            let salt = localStorage.getItem("salt");
            let hash = cyrb53(info.selectionText + salt);
            localStorage.setItem("hash", hash); 
            //document.getElementById("hash").value = hash;

            console.log(hash);
            do_pass(hash);
            break;
        }
})
var x = document.querySelector('.add');
x.addEventListener("click", addNote);

function get_salt() {
        let salt = localStorage.getItem("salt");
        return salt;
}
function init() {
        let salt = localStorage.getItem("salt");
        let hash = localStorage.getItem("hash");
        document.getElementById("salt").value = salt;
        document.getElementById("hash").value = hash;
}
init();
function addNote() {
        let salt = document.getElementById("salt").value;
        localStorage.setItem("salt", salt); 
        console.log(localStorage.getItem("salt"));
}




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
                code: "document.getElementById('" + id +  "').value = " + pass + ";" + "document.getElementById('" + id + "').type = 'password'"
        }); 
        browser.tabs.executeScript({
                code: "document.getElementById('" + id + "').type = 'password'"
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
    const passwords = ["password", "passwd","pass","loginPassword","vpassword"];

    for (var i = 0; i < passwords.length; i++) {
            var password = passwords[i];
            var id = password;
            set_pass(id,pass);
    }
    passwords.forEach(function(password) {
        var id = password;
        console.log(id);
        browser.tabs.executeScript({
                code: "document.getElementById('" + id + "').type = 'password'"
        });  
        console.log("changed to the old input");
});
}

