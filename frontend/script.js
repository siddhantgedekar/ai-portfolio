// // 1. select the elements we want to interact with
// const title = document.getElementById('main-title');
// const button = document.getElementById('hire-btn');
// const inputField = document.getElementById('user-input');
// const output = document.getElementById('output-text');

// // check if user already has an ID, if not create one
// let userId = localStorage.getItem('userId');
// if (!userId) {
//     userId = 'user_' + Math.random().toString(36).substring(2, 9);
//     localStorage.setItem('userId', userId);
// }

// // 2. define a function (a set of instructions)
// async function handleInput() {
//     // get the value the user typed
//     const userText = inputField.value;

//     // check if input is empty?
//     if(userText === "") {
//         alert("Please type something first!");
//         return; // stop the function here
//     }
    
//     // stimulate AI response
//     output.innerText = "Thinking...";

//     try {
//         // 1. send message to python
//         const response = await fetch('http://127.0.0.1:5000/chat', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ 
//                 message: userText,
//                 user_id: userId  // send the user ID for session management
//             })
//     });

//     // 2. wait for response/answer
//     const data = await response.json();

//     // 3. display the answer
//     output.innerText = data.reply;
//     } catch (error) {
//         console.error("Error: ", error);
//         output.innerText = "Error: Could not connect to server.";
//     }
    
//     // visual feedback
//     button.innerText = "Sent!";

//     // reset the inputfiled value
//     inputField.value = "";

//     setTimeout(() => {
//         button.innerText = "Send to AI";
//     }, 2000);
//     // reset the button text after 2 seconds.
// }

// function updatePage() {
//     // implementing light-switch behavior
//     if(title.innerText === "Building AI-Powered Web Apps") {
//         // change the text of the headline
//         title.innerText = "Let's Build Something Amazing";
    
//         // change the color of the text
//         title.style.color = "cyan";
    
//         // change the button text
//         button.innerText = "Request Sent!";
//     } else {
//         // change the text of the headline
//         title.innerText = "Building AI-Powered Web Apps";
    
//         // change the color of the text
//         title.style.color = "white";
    
//         // change the button text
//         button.innerText = "Hire Me";
//     }
// }

// // 3. add event listener
// // this waits for the 'click' event, then runs the function above
// button.addEventListener('click', handleInput);

const chatHistory = document.getElementById('chat-history');
const inputField = document.getElementById('user-input');
const button = document.getElementById('hire-btn');

async function handleInput() {
    const userText = inputField.value;
    if (userText === "") return;

    // 1. Add USER message to the screen immediately
    addMessageToChat(userText, 'user-message');
    
    inputField.value = ""; // Clear input

    try {
        // 2. Send to Python
        const response = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();

        // 3. Add AI message to the screen
        addMessageToChat(data.reply, 'bot-message');

    } catch (error) {
        addMessageToChat("Error: Could not connect to brain.", 'bot-message');
    }
}

// Helper function to create the HTML elements
function addMessageToChat(text, className) {
    // Create a new div
    const messageDiv = document.createElement('div');
    
    // Add the text and the class (user-message or bot-message)
    messageDiv.innerText = text;
    messageDiv.classList.add('message', className);

    // NEW CHANGE: Render markdowns..
    if (className === 'bot-message') {
        messageDiv.innerHTML = marked.parse(text);
    } else {
        messageDiv.innerText = text;
    }
    
    // Put it inside the chat history box
    chatHistory.appendChild(messageDiv);
    
    // Auto-scroll to the bottom
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

button.addEventListener('click', handleInput);

// Bonus: Allow pressing "Enter" key to send
inputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleInput();
    }
});