const itemForm = document.querySelector("#item-form")
const itemInput = document.querySelector("#item-input")
const itemlist = document.querySelector("#item-list")
const clearBtn = document.querySelector("#clear")
const filterItem = document.querySelector("#filter")
let itemEditMode = false; 
const fromBtn = document.querySelector(".btn")



function displayItemFromStorage(){

    let itemsFromStorage = getItemFormStorage() 
    itemsFromStorage.forEach(item => addItemToDom(item))

    checkLis()
}



function addItem (e){
    e.preventDefault();

    let newItem = itemInput.value;

    if(newItem === ''){
        alert("Please Entry The Item")
    }


    if(itemEditMode){
        const itemToEdit = itemlist.querySelector(".edit-mode");
        
        removeItemFromLocalStorage(itemToEdit.textContent)
        itemToEdit.style.color = "black";
        itemToEdit.remove()

        itemEditMode = false;
    }else{
        if(checkItem(newItem)){
            alert("This item is already in the list!")
            return;
        }

    }


    
        //created a new dom elememt 
    addItemToDom(newItem)
     //added item to local storage
     addItemsToStorage(newItem)
    

    itemInput.value = ""

    checkLis()

}


function addItemToDom(newItem){


    const li = document.createElement("li")
    const text = document.createTextNode(newItem)
    li.appendChild(text)


    const button = document.createElement("button")
    button.className = "remove-item btn-link text-red"
    li.appendChild(button)


    const icon = document.createElement("i")
    icon.className = "fa-solid fa-xmark"
    button.appendChild(icon)

    // ! adding a new item
    itemlist.appendChild(li)


}


function addItemsToStorage(item){
    
    let itemsFromStorage = getItemFormStorage() 

    //adding newItem to the itemsFromStorage array
    itemsFromStorage.push(item);

    //set newItem to the local storage
    localStorage.setItem("item", JSON.stringify(itemsFromStorage));

}


function removeItemFromLocalStorage(item){
     
    let itemsFromStorage = getItemFormStorage() 

    let itemsFromStorages = itemsFromStorage.filter(i => i !== item)


   localStorage.setItem("item", JSON.stringify(itemsFromStorages))

}


function getItemFormStorage(){

    if(localStorage.getItem("item" ) === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem("item"))
    }
    return itemsFromStorage
}



function removeItemFromDom(e){
      
    if(e.target.parentElement.classList.contains("remove-item")){
        removeItem(e.target.parentElement.parentElement);
    }else{
        setItemToEdit(e.target)
    }

}


function setItemToEdit(editItem){

    itemEditMode = true;

    itemlist.querySelectorAll("li").forEach((i)=> i.style.color = "black")

     editItem.style.color = "gray";
     editItem.classList.add("edit-mode")

    fromBtn.innerHTML = "<i class='fa-solid fa-pen'></i> \xa0\ Update Item";

    itemInput.value = editItem.textContent.trim()
}



function removeItem(item){
    
        if(confirm("Are you Sure?")){
            item.remove();
            checkLis()
        }

    removeItemFromLocalStorage(item.textContent)
    
}



function clearitem (){
    while(itemlist.firstChild){
        itemlist.firstChild.remove()
    }


    if(confirm("Are you Sure?")){
        localStorage.removeItem("item")
        checkLis()
    }
}



function filterlis(e){

    const liList = itemlist.querySelectorAll("li")
    
       liList.forEach((item) => {

        let itemlist = item.firstChild.textContent.toLowerCase()
        let text = e.target.value.toLowerCase()

        if(itemlist.indexOf(text) != -1){
            item.style.display = "flex";
        }else{
            item.style.display = "none";
        }
       
       });
}






function checkLis(){
    itemInput.value = "";

    const liList = document.querySelectorAll("li")
    if(liList.length === 0){
        clearBtn.style.display = "none"
        filter.style.display = "none"
    }else{
        clearBtn.style.display = "block"
        filter.style.display = "block"
    }


        fromBtn.innerHTML = "<i class='fa-solid fa-plus'></i> \xa0\ Add Item";



    itemEditMode = false;
}

function misClick(e){
    let newItem1 = e.target.value
    
    if(newItem1 === ''){
        fromBtn.innerHTML = "<i class='fa-solid fa-plus'></i> \xa0\ Add Item";
        itemlist.querySelectorAll("li").forEach((i)=> i.style.color = "black")
        itemEditMode = false;
    }

}


function checkItem(item){
    const itemsFromStorage = getItemFormStorage();
    return itemsFromStorage.includes(item);
}






itemForm.addEventListener("submit", addItem);
itemInput.addEventListener("input", misClick);
itemlist.addEventListener("click", removeItemFromDom)
clearBtn.addEventListener("click", clearitem)
clearBtn.addEventListener("click", checkLis)
filterItem.addEventListener("input", filterlis)
document.addEventListener("DOMContentLoaded", displayItemFromStorage)

checkLis()
