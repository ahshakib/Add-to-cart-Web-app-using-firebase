import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://playground-95c7f-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemInDB = ref(database, "Item")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const itemListEL = document.getElementById("item-list")

onValue(itemInDB, function(snapshot) {
    if(snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val())
    
        clearItemListEL()
        for(let i = 0; i < itemArray.length; i++){
            
            addItemList (itemArray[i])
        }
    } else {
        itemListEL.innerHTML = "No items here..."
    }
})

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    push(itemInDB, inputValue)

    clearInputFieldEl ()
    
})

function clearInputFieldEl () {
    inputFieldEl.value = ""
    
}

function clearItemListEL () {
    itemListEL.innerHTML = ""
}

function addItemList (item) {
    // itemListEL.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `Item/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    itemListEL.append(newEl)
}