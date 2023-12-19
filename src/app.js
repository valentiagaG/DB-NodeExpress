const express = require ('express');
const morgan = require('morgan');
const config = require('./config');

const clientes = require ('./modulos/clientes/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const auth = require('./modulos/auth/rutas');

const app= express();

//Middleware
// app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configuracion
app.set('port', config.app.port)

//routes
app.use('/api/clientes', clientes)
app.use('/api/usuarios', usuarios)
app.use('/api/auth', auth)

module.exports = app;