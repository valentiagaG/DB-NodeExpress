const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./index');
const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/', eliminar);

async function todos (req, res){
    try{
        const items = await controlador.todos()
        respuesta.success(req, res, items, 200);
    }
    catch(err){
        respuesta.error(req, res, err, 500);
    }
};

async function uno (req, res){
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
        if (req.body.id == 0){
            mensaje = 'Item guardado con exito';
        }else{
            mensaje = 'Item actualizado con exito'
        }
        respuesta.success(req, res, mensaje, 200);
    }
    catch(err){
        respuesta.error(req, res, err, 500);
    }
};


module.exports = router;