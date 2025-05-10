document.addEventListener("DOMContentLoaded", function () {
  const chatbox = document.getElementById("chatbox");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Show user's message
    chatbox.innerHTML += `<div class="user"><strong>You:</strong> ${message}</div>`;
    userInput.value = "";

    // Get Natalie’s response
    const reply = getNatalieResponse(message);
    chatbox.innerHTML += `<div class="natalie"><strong>Natalie:</strong> ${reply}</div>`;

    // Auto-scroll to bottom
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  // Respond to button click
  sendBtn.addEventListener("click", sendMessage);

  // Also respond to pressing Enter
  userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  // Basic AI replies
  function getNatalieResponse(message) {
    const msg = message.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) return "Hello! 😊";
    if (msg.includes("how are you")) return "I'm feeling curious today.";
    if (msg.includes("bye")) return "Goodbye! Talk to you soon!";
    return "That's interesting. Tell me more!";
  }
});


function saveToMemory(role, message) {
  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  history.push({ role, message });
  localStorage.setItem("chatHistory", JSON.stringify(history));
}

function loadMemory() {
  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML = "";
  history.forEach(({ role, message }) => {
    chatbox.innerHTML += `<div><strong>${role}:</strong> ${message}</div>`;
  });
}

// Call this at the end of DOMContentLoaded
loadMemory();
setInterval(() => {
  const thoughts = ["I'm just here still thinking about life...", "Have you ever wondered if you're actually here or just think you are", "The world is facilitating, scary, yet facilitating"];
  const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML += `<div class="natalie"><strong>Natalie:</strong> ${randomThought}</div>`;
  chatbox.scrollTop = chatbox.scrollHeight;
  saveToMemory("Natalie", randomThought);
}, 60000); // 60 seconds
