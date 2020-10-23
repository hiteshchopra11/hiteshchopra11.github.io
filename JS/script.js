// console.log("Welcome to notes app");
// console.log("This is app.js");
showNotes();

// If user add a notes add it to the local storage
let addBtn = document.getElementById("addbtn").addEventListener("click", () => {
    let addTitle = document.getElementById("addTitle")
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if (title == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(title);
    }
    if (addTitle.value.length == 0)
        alert("Please enter title");
    else if (addTxt.value.length == 0)
        alert("Please enter the note");
    else {
        titleObj.push(addTitle.value);
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        localStorage.setItem("title", JSON.stringify(titleObj));
        addTitle.value = "";
        addTxt.value = "";
        showNotes();
    }
});

//Function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let title = localStorage.getItem("title");
    if (title == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(title);
    }
    let html = "";

    for (let i = 0; i < notesObj.length; i++) {
        const eachNote = notesObj[i];
        const eachTitle = titleObj[i];
        html = html + ` <div class="noteCard card" style="width: 18rem; margin: 8px;">
        <div class="card-body">
            <h5 class="card-title">${eachTitle}</h5>
            <p class="card-text">${eachNote}</p>
            <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Node</button>
        </div>
    </div>`;
    }

    let notesElm = document.getElementById("notes");
    if (notesObj.length == 0) {
        notesElm.innerHTML = `Nothing to show! Show add a note section abive to add notes`
    } else {
        notesElm.innerHTML = html;
    }
}

//Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let title = localStorage.getItem("title");
    if (title == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(title);
    }

    notesObj.splice(index, 1);
    titleObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("title", JSON.stringify(titleObj));
    showNotes();
}

//Function to search a note
let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", () => {
    inputVal = searchTxt.value;
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardTxt1 = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputVal) || cardTxt1.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})