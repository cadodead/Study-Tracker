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
// #Things to work on this April 30th:
    // const currentIdx = Number(deleteButton.dataset.index);
    // then later inside the click listener:
    // deleteButton.dataset.index = index;
    // You're reading dataset.index before you've set it. So currentIdx is always NaN.
    // Swap those two lines. Set deleteButton.dataset.index = index first, then read it with Number(deleteButton.dataset.index).
    // Fix that one line order and test it. Does delete work?

// Tip:
    // Lesson to remember: When you see X is not a function on an array method like
    // forEach, first ask — is what I'm calling it on actually an array?
    // In this case it wasn't, and the culprit was bad data, not bad code.
