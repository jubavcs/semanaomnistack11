const express = require('express');
const OngConstroller = require('./controllers/OngController');
const IncidentConstroller = require('./controllers/IncidentController');
const ProfileConstroller = require('./controllers/ProfileController');
const SessionConstroller = require('./controllers/SessionController');

const connection = require('./database/connection');

const routes = express.Router();


// Login
routes.post('/sessions', SessionConstroller.create);

//ONGS
routes.get('/ongs', OngConstroller.index);
routes.post('/ongs',  OngConstroller.create);


//Incidents
routes.post('/incidents',  IncidentConstroller.create);
routes.get('/incidents',  IncidentConstroller.index);
routes.delete('/incidents/:id',  IncidentConstroller.delete);

routes.get('/profile',  ProfileConstroller.index);

module.exports = routes;
