//—————————————————————————————————————————————————————————————————————————
const quotesDisplay = [{
        quote:`If we focus only on past causes and try 
        to explain things solely through cause and effect, 
        we end up with “determinism.” Because what this says is that our 
        present and our future have already been decided 
        by past occurrences and are unalterable.`,
        author: "— Ichiro Kishimi and Fumitake Koga",
        book:  "The Courage to Be Disliked"
    },{
        quote: `To create is to live twice.`,
        author: "— Albert Camus",
        book: null},
    {    
        quote: `Each man longs to pursue his dream.
        Each man is tortured by this dream, 
        but the dream gives meaning to his life`,
        book: "Berserk",
        author: "— Kentaro Miura, Griffith"}
    ];

const titleText = document.getElementById("h1Element"); // this is for the TQ.
const randomizedQuotes = Math.floor(Math.random() * quotesDisplay.length); // this is for the entire object.
const quoteContainer = document.querySelector('.retro-container');  // this is the DIV for all the object to be displayed into.

quoteContainer.id = "retro-id-container"; // this is for the TQ.

const selectedQuotes = quotesDisplay[randomizedQuotes]; // this is for the TQ.
const quoteHeader = document.createElement('h2'); // this is for the TQ.
quoteHeader.textContent = `${selectedQuotes.quote}`; // this is for the TQ.
const bookHeader = document.createElement('h3'); // this is for the BH.
const authorHeader = document.createElement('h4'); // this is for the AH.
 
bookHeader.id = "book-header"; // this is for the BH.
const nullBooks = selectedQuotes.book === null ? `[Title Unknown]` :  selectedQuotes.book; // this is for the BH.
bookHeader.textContent = `${nullBooks}`; // this is for the BH.

authorHeader.id = "author-header";
authorHeader.textContent = `${selectedQuotes.author}`;

titleText.insertAdjacentElement("afterend", authorHeader) // this is for the AH.
titleText.insertAdjacentElement("afterend", bookHeader); // this is for the BH.
titleText.insertAdjacentElement("afterend", quoteHeader); // this is for the TQ.

//—————————————————————————————————————————————————————————————————————————
//—————————————————————————————————————————————————————————————————————————
const subject = document.getElementById("subjectInput");
const duration = document.getElementById("durationInput");  
const notes = document.getElementById("notesInput");
const buttonLog = document.getElementById("submitBtn");
const buttonReset = document.getElementById("resetButton"); 
const sessions = document.getElementById("sessionList");
const dataListContainer = document.getElementById("subjects");

const renderSession = () => {
        const retrievedSessions = JSON.parse(localStorage.getItem('userForm')) || [];
        sessions.innerHTML = ""; // We had this because if we didn't — each log of sessions would iterating with the entire list with new one appended.
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
//—————————————————————————————————————————————————————————————————————————
//—————————————————————————————————————————————————————————————————————————

const renderDataList = () =>{
        const storedData = JSON.parse(localStorage.getItem('userForm')) || [];
        const noDuplicates = [...new Set(storedData.map(sub => sub.sub))];
        dataListContainer.innerHTML = ""; // We had this because if we didn't — each log of sessions would iterating with the entire list with new one appended.

        noDuplicates.forEach(sub =>{
            const optionContainer = document.createElement("option");
            optionContainer.textContent = `${sub}`;
            dataListContainer.append(optionContainer); 
        })
}  
renderDataList();
//—————————————————————————————————————————————————————————————————————————
//—————————————————————————————————————————————————————————————————————————
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
    renderDataList();
});

renderSession();
renderDataList();
//—————————————————————————————————————————————————————————————————————————