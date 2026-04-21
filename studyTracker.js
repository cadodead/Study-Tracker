const subject = document.getElementById("subjectInput");
const duration = document.getElementById("durationInput");  
const notes = document.getElementById("notesInput");
const buttonLog = document.getElementById("submitBtn");
const buttonReset = document.getElementById("resetButton"); 
const sessions = document.getElementById("sessionList");


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
    // Trace the code to enhance my intuition.
    const existingData = JSON.parse(localStorage.getItem('userForm')) || []; // So I did some digging at Google,
    //"This attempts to retrieve a value associated with the key 'userForm'", so userForm in this context is just some predefined variable?
    existingData.push(formData); //How do you phrase this? Are we pushing existingData into formData or is it the opposite?
    localStorage.setItem('userForm', JSON.stringify(existingData)); //With the key "userForm"/existingData, we stringfy it so that we can pass it into the localStorage.
    event.preventDefault(); 
    subject.value = "";
    duration.value = "";
    notes.value = "";
})
// Here's another question, if building projects is the "best" approach for learning programming, then what is the right headspace/ work flow/ approach to a problem during that session of coding? 
   
// The display feature is actually the most satisfying one — you'll finally see your data on the page instead of just in DevTools.
// Before writing anything, plain English first: you have an array of session objects sitting in localStorage. How do you think you'd get them showing up as a list on the page?
// Think about what HTML element holds a list, and what JS tool you'd use to loop through the array and create each item. You've seen both before.
