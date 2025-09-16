// Speak message function
function speakText(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}

// Create message element with sound button
function createMessageElement(text, className) {
  const wrapper = document.createElement("div");
  wrapper.className = className + " msg-wrapper";

  const msg = document.createElement("span");
  msg.className = "msg-text";
  msg.textContent = text;

  const soundBtn = document.createElement("button");
  soundBtn.className = "sound-btn";
  soundBtn.innerHTML = "🔊";
  soundBtn.onclick = () => speakText(text);

  wrapper.appendChild(msg);
  wrapper.appendChild(soundBtn);

  return wrapper;
}

// Chat functionality
function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const userText = input.value.trim();

  if (userText !== "") {
    // User message
    const userMsg = createMessageElement(userText, "user-msg");
    chatBox.appendChild(userMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Bot auto-reply
    setTimeout(() => {
      const botReply = getBotReply(userText);
      const botMsg = createMessageElement(botReply, "bot-msg");
      chatBox.appendChild(botMsg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 600);

    input.value = "";
  }
}

// Send with Enter key
document.getElementById("userInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

// Bot replies
function getBotReply(msg) {
  const lower = msg.toLowerCase().trim();

  if (/(hi|hello|hey|yo)/.test(lower))
    return "✨ Hey there! How’s your day going?";
  if (/(gm|good morning)/.test(lower))
    return "☀️ Good morning! Hope you have a bright day ahead!";
  if (/(gn|good night)/.test(lower))
    return "🌙 Good night! Sleep well and sweet dreams!";
  if (/good afternoon/.test(lower))
    return "🌼 Good afternoon! How’s your day so far?";
  if (/good evening/.test(lower))
    return "✨ Good evening! Relax and enjoy your time!";

  if (/how\s+are\s+you/.test(lower))
    return "I’m glowing like the stars ✨, thanks for asking!";
  if (/wassup|sup/.test(lower))
    return "🚀 Just vibin’! What about you?";
  if (/bye/.test(lower))
    return "🌙 Goodbye! Have a wonderful day.";
  if (/thanks|thank you/.test(lower))
    return "💫 Always here for you!";
  if (/who\s+are\s+you/.test(lower))
    return "🤖 I’m your modern aesthetic chatbot!";
  if (/love\s+you/.test(lower))
    return "❤️ Aww! Love you too, starshine ✨";

  if (/time|what time/.test(lower))
    return "⏰ Current time is: " + new Date().toLocaleTimeString();
  if (/date|what day|today/.test(lower))
    return "📅 Today is: " + new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  if (/weather/.test(lower))
    return "🌦 I can’t check live weather, but I hope the skies are clear where you are!";
  if (/joke/.test(lower))
    return "😂 Here’s one: Why don’t skeletons fight each other? Because they don’t have the guts!";
  if (/motivate|motivation/.test(lower))
    return "💡 Remember: Small steps every day lead to big changes. Keep glowing! ✨";
  if (/fact/.test(lower))
    return "📖 Did you know? Honey never spoils — even after 3000 years!";

  return `✦ I felt your vibe: "${msg}" ✨`;
}

// Preload greetings
window.onload = () => {
  const chatBox = document.getElementById("chatBox");
  const greetings = [
    "✦ Hello! Welcome to your modern chat space 🌌",
    "✦ How’s your day going so far?",
    "✦ I can chat with you about anything — just type away 🚀"
  ];

  greetings.forEach(text => {
    const botMsg = createMessageElement(text, "bot-msg");
    chatBox.appendChild(botMsg);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
};

// Subtle Starry Cursor Effect
const canvas = document.getElementById("starCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let stars = [];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  document.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 2; i++) {
      stars.push({
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 20,
        radius: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.01,
        color: ["#fff","#ccddee","#aabbee"].sort(() => 0.5 - Math.random())[0]
      });
    }
  });

  function drawStar(s) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${parseInt(s.color.slice(1,3),16)},${parseInt(s.color.slice(3,5),16)},${parseInt(s.color.slice(5,7),16)},${s.alpha})`;
    ctx.shadowBlur = 4;
    ctx.shadowColor = s.color;
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((s, i) => {
      drawStar(s);
      s.x += s.dx;
      s.y += s.dy;
      s.alpha -= s.decay;
      if (s.alpha <= 0) stars.splice(i, 1);
    });

    requestAnimationFrame(animate);
  }

  animate();
}
