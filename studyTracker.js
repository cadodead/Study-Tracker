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
            li.textContent = `${session.sub} - ${session.time} mins - ${session.note}`;
            sessions.append(li);
    // —————————————April 27th, 2026—————————————
        // innerHTML is the property — not a method so no (). To clear the list, set it to empty.
        // One line, inside renderSession before the forEach. What would that look like?
        // On validation — yes, a conditional. Before existingData.push(formData), 
        // check if subject.value is empty. If it is, don't push, maybe just return early.
        // Write both fixes — innerHTML clear first, then the conditional guard. Attempt it.
        })} 
    // ——————————————————————————————————————————
buttonLog.addEventListener("click", (event) =>{
    console.log({
        sub:subject.value,
        time: duration.value,
        note: notes.value        
//  —————————— April 28th ——————————
    // Then today's only goal:
    // Add the validation guard. Inside the buttonLog listener, 
    // before existingData.push(formData), write a conditional that checks 
    // if subject.value is empty and stops the save if it is.
    // Before writing it - what does an empty input 
    // field's .value actually equal? And what keyword 
    // stops a function from continuing early?
        // — An empty input field is equal to '[]', a null?
        // — What stops a value is 'return'?
// —————————————————————————————————
    });

    const formData = {
        sub:subject.value,
        time: duration.value,
        note: notes.value
    } //Why not can't I just use formData? Can't I use it like this 'formData.value'? ← !THIS DOES NOT WORK!
 
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