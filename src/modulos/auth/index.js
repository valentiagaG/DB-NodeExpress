//esto se hace para poder reutilizary elegir cualqueir db
const db = require('../../DB/mysql');
const ctrl = require('./controlador');

module.exports = ctrl(db);