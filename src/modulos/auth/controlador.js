//desde aca se hacen todas las consultas a la base de datos

const TABLA = 'authentication';
const bcrypt = require('bcrypt');
const auth = require('../../auth')

module.exports = function(dbInyectada){

    let db=dbInyectada;

    if (!db){
        db = require('../../DB/mysql');
    }

    async function login(userName, password){
        const data=await db.query(TABLA, {userName: userName});

        return bcrypt.compare(password, data.password)
        .then(resultado =>{
                if (resultado === true){
                    //Generar un token
                    return auth.asignarToken({...data})
                }
                else{
                    throw new Error('Info inválida.')
                }
            }) 
    }
    
    async function agregar(data){

        const authData = {
            id: data.id,
        }

        if (data.userName){
            authData.userName = data.userName
        }

        if (data.password){
            authData.password = await bcrypt.hash(data.password.toString(), 5);
        }
         return db.agregar(TABLA, authData);
     }

     
    return{
        agregar,
        login
    } 
}