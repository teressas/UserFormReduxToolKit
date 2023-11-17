const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const fs = require('fs');
const path = require('path');


const app = express();
app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.json());

const USERS_FILE = path.join(__dirname, 'users.json');

app.get('/api/users/:userId', (req, res) => {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    const user = users.find(u => u.id === req.params.userId);
    res.json(user || {});
});

app.put('/api/users/:userId', (req, res) => {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    const updatedUser = req.body;
    const index = users.findIndex(u => u.id === req.params.userId);
    if (index !== -1) {
        users[index] = updatedUser;
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        res.json(updatedUser);
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});