const subject = document.getElementById("subjectInput");
const duration = document.getElementById("durationInput");  
const notes = document.getElementById("notesInput");
const buttonLog = document.getElementById("submitBtn");
const buttonReset = document.getElementById("resetButton"); 
const sessions = document.getElementById("sessionList");

const renderSession = () => {
        const retrievedSessions = JSON.parse(localStorage.getItem('userForm')) || [];
        // This is a syntax for clearing content.
        sessions.innerHTML = "";
        // The code above is for clearing content.
        retrievedSessions.forEach((session, index) => {
            const li = document.createElement('li');
            li.textContent = `${session.sub} - ${session.time} mins - ${session.note}`;
            sessions.append(li);
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.id = "button-delete";
            li.append(deleteButton);
            deleteButton.dataset.index = index;
            const currentIdx = Number(deleteButton.dataset.index);
            //—————————————————————————————————
            
            deleteButton.addEventListener("click", (event1) =>{
                const storedData = (localStorage.getItem('userForm'));
                const filterArray = storedData ? JSON.parse(storedData) : [];
                const deleteSession = filterArray.filter((item, i) => i !== currentIdx);
                localStorage.setItem('userForm', JSON.stringify(deleteSession));
                renderSession();
            })
        })} 
            
buttonLog.addEventListener("click", (event) =>{
    console.log({
        sub:subject.value,
        time: duration.value,
        note: notes.value        
    });
    const formData = {
        sub:subject.value,
        time: duration.value,
        note: notes.value
    } 
 
    const existingData = JSON.parse(localStorage.getItem('userForm')) || [];
        if(subject.value === ""){
            return;
        } 
    existingData.push(formData); 
    localStorage.setItem('userForm', JSON.stringify(existingData));
     
    event.preventDefault(); 
    subject.value = "";
    duration.value = "";
    notes.value = "";    
    renderSession();
});

renderSession();
// ==============================================
// STUDY TRACKER V1 — CODE SUMMARY
// April 2026
// ==============================================

// ARCHITECTURE:
// This project has two natural layers:
// - Data layer: localStorage operations (get, parse, push, stringify, setItem)
// - UI layer: DOM operations (renderSession, createElement, append)
// Both live in one file at V1 scale — acceptable for now.

// KEY CONCEPTS USED:
// - document.getElementById() — grabs DOM elements by ID
// - addEventListener() — listens for user interactions
// - event.preventDefault() — stops form from refreshing the page
// - localStorage.setItem/getItem — browser's built-in persistent storage
// - JSON.stringify/parse — converts objects↔strings for localStorage
// - || [] — safeguard fallback when localStorage returns null
// - Array.push() — adds new session to existing array
// - Array.filter() — creates new array excluding deleted session
// - forEach((item, index)) — loops with access to each item's position
// - document.createElement() — creates new DOM elements dynamically
// - element.append() — adds elements into the DOM
// - element.innerHTML = "" — clears DOM content before re-rendering
// - dataset.index — attaches custom data to a DOM element
// - Number() — converts string index from dataset back to a number
// - Validation guard: if(value === "") return — stops empty submissions
// - Scope — functions defined outside listeners are accessible everywhere
// ==============================================