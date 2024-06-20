"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
const DB_FILE_PATH = path_1.default.join(__dirname, 'db.json');
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Ensure the db.json file exists
if (!fs_1.default.existsSync(DB_FILE_PATH)) {
    fs_1.default.writeFileSync(DB_FILE_PATH, JSON.stringify([]));
}
// Route to handle submission
app.post('/submit', (req, res) => {
    const submissions = JSON.parse(fs_1.default.readFileSync(DB_FILE_PATH, 'utf-8'));
    const newSubmission = req.body;
    submissions.push(newSubmission);
    fs_1.default.writeFileSync(DB_FILE_PATH, JSON.stringify(submissions));
    res.status(201).json({ message: 'Submission received!' });
});
// Route to read submissions
app.get('/read', (req, res) => {
    console.log('Received request for /read');
    const submissions = JSON.parse(fs_1.default.readFileSync(DB_FILE_PATH, 'utf-8'));
    res.status(200).json(submissions);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
