// console.log("Welcome to notes app");
// console.log("This is app.js");
showNotes();

// If user add a notes add it to the local storage
let addBtn = document.getElementById("addbtn").addEventListener("click", (e) => {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();
});

//Function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach((element, index) => {
        html = html + ` <div class="noteCard card" style="width: 18rem; margin: 8px;">
        <div class="card-body">
            <h5 class="card-title">Note ${index+1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Node</button>
        </div>
    </div>`;
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length == 0) {
        notesElm.innerHTML = `Nothing to show! Show add a note section abive to add notes`
    } else {
        notesElm.innerHTML = html;
    }
}

//Function to delete a note
function deleteNote(index) {
    // console.log("I am deleting ", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//Function to search a note
let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", () => {
    inputVal = searchTxt.value;
    // console.log("Input event fired ", inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})