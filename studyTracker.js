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
            deleteButton.addEventListener("click", (event1) =>{
                const storedData = (localStorage.getItem('userForm'));
                const filterArray = storedData ? JSON.parse(storedData) : [];
                const deleteSession = filterArray.filter((item, i) => i !== currentIdx);
                localStorage.setItem('userForm', JSON.stringify(deleteSession));
                renderSession();
            })
        }  
    )
                const totalHours = retrievedSessions.reduce((acc, curr) => acc + Number(curr.time), 0);
                const hourCounter = document.createElement("div");  
                hourCounter.textContent = `${totalHours}`;
                sessions.append(hourCounter); 
}          
 
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

//—————————May 1, 2026—————————
// # Tips:
    // a TypeError is a specific kind of runtime error that
    // occurs when an operation cannot be performed 
    // because a value is not of the expected type