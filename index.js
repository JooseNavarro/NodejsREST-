const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');
      usuarios = mongoose.model('usuarius', {nombre : String});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/jose', (err, conection)=>{
      if (err) {
            console.log('tenemos error');
      }else {
       app.listen(8080, ()=>{
         console.log('Todo Esta bien el server corre en http://localhost:8080');
   })
}
})

//Get
app.get('/', (req, res)=>{
   usuarios.find((err, quert)=>{
      res.status(200).send({Nombre: quert})
   })
})

//post
app.post('/new/', (req, res)=>{
   let persona = new usuarios();
   persona.nombre = req.body.nombre;

   persona.save()
})

//Delete
app.delete('/:rmId', (req, res)=>{
   let none = req.params.rmId;
   usuarios.findById(none, (err, rmgod)=>{
      if (err) {
         res.send(err)
      }if(!rmgod){
         res.status(404).send('no encontre nada de -> ' + none)
      }
      rmgod.remove(
            res.status(202).send('El ' + rmgod.nombre +  ' fue eliminado correctamente -> ' )
      )
   })
})

//Update
app.put('/new/:rmUd', (req, res)=>{
   let actualizar = req.params.rmUd;

   usuarios.findById(actualizar, (err, queryUpdate)=>{
      if (err) {

      }if(!queryUpdate){
         res.send('nada')
      }else {
         queryUpdate.nombre = req.body.nombre;
            queryUpdate.save((err, ok)=>{
               res.status(200).send('todo bien')
            })
      }


   })
})
