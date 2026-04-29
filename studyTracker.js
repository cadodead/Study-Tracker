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
            // —————————— April 29th ——————————
                // Read the index — deleteButton.dataset.index gives you 
                // a string, so wrap it in Number() to convert it
                // Filter the array — get from localStorage, parse 
                // it, filter out the item at that index
                // Save and redraw — stringify, setItem, 
                // call renderSession()
            // —————————— April 29th ——————————
            const deleteButton = document.createElement("button");// I should add an ID just in case.
            deleteButton.innerText = "Delete";
            deleteButton.id = "button-delete";
            li.append(deleteButton);
            const currentIdx = Number(deleteButton.dataset.index);//"You want to keep every session except the one at currentIdx.", why?
            //—————————————————————————————————
            
            deleteButton.addEventListener("click", (event1) =>{
                deleteButton.dataset.index = index;
                    // Code interpretation:
                        // — So each session presents an index.
                        // — we convert it to an actual number because initally it was in a string format
                        // — "deleteSession"'s value is filtering filterArray(an array).
                        // — What does 'item' represent? a copy of our session? is its index not equal to currentIdx.
                        // — and in our case currentIdx is equal to the number format of 'dataset.index'.
                const storedData = (localStorage.getItem('userForm'));// How to use filter() in this context?
                const filterArray = storedData ? JSON.parse(storedData) : [];
                const deleteSession = filterArray.filter((item, i) => i !== currentIdx);//"keep only items where the index is NOT the one we're deleting."
                localStorage.setItem('userForm', JSON.stringify(deleteSession));
                renderSession();
            })
        })} 
            // —————————— April 29th ——————————
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