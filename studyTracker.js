const quotesDisplay = [{
        quote:`If we focus only on past causes and try 
        to explain things solely through cause and effect, 
        we end up with “determinism.” Because what this says is that our 
        present and our future have already been decided 
        by past occurrences and are unalterable.`,
        author: "Ichiro Kishimi and Fumitake Koga",
        book:  "The Courage to Be Disliked"
    },{
        quote: `To create is to live twice.`,
        author: "Albert Camus",
        book: null},
    {    
        quote: `Each man longs to pursue his dream.
        Each man is tortured by this dream, 
        but the dream gives meaning to his life`,
        book: "Berserk",
        author: "Kentaro Miura"}
    ];
const titleText = document.getElementById("h1Element");
const randomizedQuotes = Math.floor(Math.random() * quotesDisplay.length); // How would I set the output as the quote themselves?
const quoteContainer = document.querySelector('.retro-container'); // ↑ This will be its container
quoteContainer.id = "retro-id-container";// This is where we append out <h2>
const selectedQuotes = quotesDisplay[randomizedQuotes];
const quoteHeader = document.createElement('h2');
const nullBooks = selectedQuotes.book ? null : "";
quoteHeader.textContent = `${selectedQuotes.quote}`;
titleText.insertAdjacentElement("afterend", quoteHeader);
// quoteContainer.insertAdjacentHTML("afterbegin",  '<h1>STATION: STUDY TRACKER</h1>');// I misused this thinking I'd be able to adjust the position
// # Psuedo-code for excluding null books
/* 
    IF-ELSE:
    if(selectedQuotes.book === null){
        return = "";
    }

    Ternary:

*/

//——————————————— May 05, 2026 ———————————————
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

// ==============================================
// STUDY TRACKER V2 — PROGRESS LOG
// May 2026
// ==============================================

// QUOTE GENERATOR:
// - quotesDisplay is an array of objects with .quote, .author, .book properties
// - Math.random() returns a decimal between 0 and 1
// - Math.floor(Math.random() * array.length) gives a valid random index
// - Access object properties with dot notation: selectedQuotes.quote
// - querySelector grabs the first matching element (vs getElementsByClassName which returns a collection)
// - append() adds inside an element at the end
// - prepend() adds inside an element at the beginning
// - insertAdjacentElement() places an element relative to a specific target
// - textContent is safe for plain text; innerHTML renders HTML tags
// - Ternary for null check: value ? value : "" 
//   (if truthy show it, else show empty string)
// - Multi-line strings use backticks (template literals)
// ==============================================