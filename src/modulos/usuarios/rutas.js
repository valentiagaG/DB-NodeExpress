const express = require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');
const controlador = require('./index');
const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/',seguridad(), agregar);
router.put('/', seguridad(), actualizar);
router.put('/', seguridad(), eliminar);

async function todos(req, res){
    try{
        const items = await controlador.todos()
        respuesta.success(req, res, items, 200);
    }
    catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function uno(req, res){
    try{
        const items = await controlador.uno(req.params.id)
        respuesta.success(req, res, items, 200);
    }
    catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function eliminar(req, res){
    try{
        const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'Item eliminado satisfactoriamente', 200);
    }
    catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function agregar(req, res){
    try{
        const items = await controlador.agregar(req.body);
        mensaje = 'Item guardado con exito';
        respuesta.success(req, res, mensaje, 200);
    }
    catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function actualizar(req, res){
    try{
        const items = await controlador.actualizar(req.body);
        mensaje = 'Item actualizado con exito'
        respuesta.success(req, res, mensaje, 200);
    }
    catch(err){
        respuesta.error(req, res, err, 500);
    }
};

module.exports = router;