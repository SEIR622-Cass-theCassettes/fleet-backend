const express = require('express');
const cors = require('cors');
const trucksController = require('./controllers/trucks');
const usersController = require('./controllers/users');

const millageController = require('./controllers/millage');


const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

//Routes
app.use('/api/trucks', trucksController);
app.use('/api/users', usersController);
app.use('/api/millage', millageController);

const {
	handleErrors,
	handleValidationErrors,
} = require('./middleware/custom_errors');
app.use(handleValidationErrors);
app.use(handleErrors);

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
