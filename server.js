const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

// Read existing data or initialize
function readData() {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch {
        return { users: [] };
    }
}

// Save data
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Handle signup
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const data = readData();

    if (data.users.some(u => u.email === email)) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = { id: Date.now(), name, email, password, createdAt: new Date().toISOString() };
    data.users.push(newUser);
    writeData(data);
    res.json({ message: 'Signup successful', user: newUser });
});

// Handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const data = readData();

    const user = data.users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user });
});

app.listen(3000, () => console.log('✅ Server running at http://localhost:3000'));
