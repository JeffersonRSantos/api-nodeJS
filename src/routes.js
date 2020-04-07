const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProrfileController =  require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//login
routes.post('/sessions', SessionController.index);

//index - listar
routes.get('/listar', OngController.index);
//create
routes.post('/ongs', OngController.create);
//create incidents
routes.post('/incidents', IncidentsController.create);
//create incidents
routes.get('/i/listar', IncidentsController.index);
//delete incidents
routes.delete('/delete/:id', IncidentsController.delete);
//profile 
routes.get('/profile', ProrfileController.index);

module.exports =  routes;