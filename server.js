const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let users = [
  { username: "pavel", password: "admin123", role: "owner", online: false }
];

let sessions = [];
let totalHours = 0;

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(401).json({ error: "Credenziali errate" });

  res.json({ success: true, username: user.username, role: user.role });
});

app.post("/start", (req, res) => {
  const { username } = req.body;

  sessions.push({
    username,
    start: Date.now(),
  });

  res.json({ message: "Servizio iniziato" });
});

app.post("/stop", (req, res) => {
  const { username } = req.body;

  const session = sessions.find((s) => s.username === username && !s.end);

  if (!session) return res.status(400).json({ error: "Nessuna sessione attiva" });

  session.end = Date.now();

  const hours = (session.end - session.start) / 3600000;

  totalHours += hours;

  res.json({ hours });
});

app.get("/stats", (req, res) => {
  res.json({
    staff: users.length,
    sessions: sessions.length,
    hours: totalHours.toFixed(2),
  });
});

app.listen(3000, () => {
  console.log("Server avviato su http://localhost:3000");
});
