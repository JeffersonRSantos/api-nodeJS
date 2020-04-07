const knex = require('knex');
//arquivo de conexão
const configDb = require('../../knexfile');

//passo os paramentros do tipo da conexão (development)
const connection = knex(configDb.development);

module.exports = connection;