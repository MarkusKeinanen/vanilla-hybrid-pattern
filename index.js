import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Login } from './js/Login/Login.js';
import { Signup } from './js/Signup/Signup.js';
import { Stuff } from './js/Stuff/Stuff.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'js')));

app.get(['/', '/login'], (req, res) => {
	res.send(Login());
});
app.get('/signup', (req, res) => {
	res.send(Signup());
});
app.get('/login', (req, res) => {
	res.send(Login());
});
app.get('/stuff', (req, res) => {
	res.send(Stuff());
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

global.html = (strings, ...values) => {
	return strings.reduce((result, string, i) => result + string + (values[i] !== undefined ? values[i] : ''), '');
};
global.APP_VERSION = '1.0.0';
