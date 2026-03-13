let username = localStorage.getItem("username");

async function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user, password: pass }),
  });

  if (res.ok) {
    localStorage.setItem("username", user);
    window.location = "/dashboard.html";
  } else {
    alert("Login fallito");
  }
}

async function loadStats() {
  const res = await fetch("/stats");
  const data = await res.json();

  document.getElementById("staff").innerText = data.staff;
  document.getElementById("sessions").innerText = data.sessions;
  document.getElementById("hours").innerText = data.hours;
}

async function start() {
  await fetch("/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });

  alert("Servizio iniziato");
}

async function stop() {
  const res = await fetch("/stop", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });

  const data = await res.json();

  alert("Ore lavorate: " + data.hours);
}

if (window.location.pathname.includes("dashboard")) {
  loadStats();
}
