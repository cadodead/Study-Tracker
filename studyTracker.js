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
        retrievedSessions.forEach((session) => {
            const li = document.createElement('li');
            // —————————— April 28th ——————————
            // Proposed Solution 1:
            // const deleteButton = document.createElement("button");
                // how do we set button.dataset.index = index using DOM?
            // deleteButton.dataset.index = (?)
            // li.append(deleteButton);
            li.textContent = `${session.sub} - ${session.time} mins - ${session.note}`;
            sessions.append(li);
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
//  —————————— April 28th ——————————
    // retrievedSessions.forEach((session, index) => {
    // Now you have the index. The question is how to attach 
    // it to the button so when it's clicked, it knows which one it is.
    // HTML elements have something called data attributes — you can 
    // store custom info directly on an element like this:
    // html<button data-index="2">Delete</button>
    // Then in JS you can read it back with button.dataset.index.

    // So your task inside renderSession's forEach, for each session:

    // Create a delete button
    // 
    // Append the button to the li

    // Then separately, add a click listener to that button that reads 
    // dataset.index and deletes the right session. Before writing — describe back to me 
    // in plain English what the delete listener needs to 
    // do with that index once it has it. Three steps, you listed them earlier.
//  ————————————————————————————————
