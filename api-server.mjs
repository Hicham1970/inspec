import express from 'express';
import cors from 'cors';
import contactHandler from './contact.js';
import testHandler from './test.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', testHandler.default || testHandler);
app.post('/contact', contactHandler.default || contactHandler);

app.listen(3001, () => console.log('API test server: http://localhost:3001'));

