"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const dbFilePath = 'db.json';
const readDatabase = () => {
    if (!fs_1.default.existsSync(dbFilePath)) {
        return [];
    }
    const data = fs_1.default.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
};
const writeDatabase = (data) => {
    fs_1.default.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};
app.get('/ping', (req, res) => {
    res.send(true);
});
app.post('/submit', (req, res) => {
    const newSubmission = req.body;
    const submissions = readDatabase();
    submissions.push(newSubmission);
    writeDatabase(submissions);
    res.status(201).send(newSubmission);
});
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index, 10);
    const submissions = readDatabase();
    if (isNaN(index) || index < 0 || index >= submissions.length) {
        // return res.status(400).send('Invalid index');
    }
    res.send(submissions[index]);
});
app.get('/submissions', (req, res) => {
    const submissions = readDatabase();
    res.send(submissions);
});
// Root route for verification
app.get('/', (req, res) => {
    res.send('Backend Server is Running');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
