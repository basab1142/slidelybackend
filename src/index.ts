import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

interface Submission {
  fullName: string;
  email: string;
  phone: string;
  githubLink: string;
  stopwatchTime: string;
}

const dbFilePath = 'db.json';

const readDatabase = (): Submission[] => {
  if (!fs.existsSync(dbFilePath)) {
    return [];
  }
  const data = fs.readFileSync(dbFilePath, 'utf8');
  return JSON.parse(data) as Submission[];
};

const writeDatabase = (data: Submission[]): void => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

app.get('/ping', (req: Request, res: Response) => {
  res.send(true);
});

app.post('/submit', (req: Request, res: Response) => {
  const newSubmission: Submission = req.body;
  const submissions = readDatabase();
  submissions.push(newSubmission);
  writeDatabase(submissions);
  res.status(201).send(newSubmission);
});

app.get('/read', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  const submissions = readDatabase();
  if (isNaN(index) || index < 0 || index >= submissions.length) {
    // return res.status(400).send('Invalid index');
  }
  res.send(submissions[index]);
});

app.get('/submissions', (req: Request, res: Response) => {
  const submissions = readDatabase();
  res.send(submissions);
});

// Root route for verification
app.get('/', (req: Request, res: Response) => {
  res.send('Backend Server is Running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
