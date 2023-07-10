require('dotenv').config();
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();


const Plato= require('./models/plato');


app.use(express.json());
app.use(cors());


const Connection = async()=> { 
    try {
         mongoose.connect(process.env.MONGO);
        console.log('Conexion Exitosa');

    } catch (error) {
        throw new Error('No se conecto')
    }
  }

Connection(); 

app.get('/platos', async (req, res) => {
    console.log('TRYING TO FETCH PlatoS');
    try {
      const Platos = await Plato.find();
      res.status(200).json({
        Platos: Platos.map((Plato) => ({
          id: Plato.id,
         NombrePlato: Plato.NombrePlato,
        })),
      });
      console.log('FETCHED PlatoS');
    } catch (err) {
      console.error('ERROR FETCHING PlatoS');
      console.error(err.message);
      res.status(500).json({ message: 'Failed to load Platos.' });
    }
  });

  app.post('/platos', async (req, res) => {
    console.log('TRYING TO STORE plato');
    const nombre = req.body.NombrePlato;
  
    if (!nombre || nombre.trim().length === 0) {
      console.log('INVALID INPUT - NO NombrePlato');
      return res.status(422).json({ message: 'Invalid plato NombrePlato.' });
    }
  
    const plato = new Plato({
      NombrePlato: nombre,
    });
  
    try {
      await plato.save();
      res
        .status(201)
        .json({ message: 'plato saved', plato: { id: plato.id, NombrePlato: nombre } });
      console.log('STORED NEW plato');
    } catch (err) {
      console.error('ERROR FETCHING plato');
      console.error(err.message);
      res.status(500).json({ message: 'Failed to save plato.' });
    }
  });


  app.delete('/plato/:id', async (req, res) => {
    console.log('TRYING TO DELETE Plato');
    try {
      await Plato.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Deleted Plato!' });
      console.log('DELETED Plato');
    } catch (err) {
      console.error('ERROR FETCHING platos');
      console.error(err.message);
      res.status(500).json({ message: 'Failed to delete Plato.' });

    }
  });

app.put('/plato/:id', async (req, res) => {
    console.log('TRYING TO UPDATE plato');
    try {
     const {id} = req.params;
     const {...data } =  req.body;
     console.log(id,data)
     await Plato.findByIdAndUpdate(id,data )
    console.log('UPDATE plato');
    res.status(200).json({ message: 'Actualizo' });
    } catch (err) {
      console.error('ERROR FETCHING plato');
      console.error(err.message);
      res.status(500).json({ message: 'Failed to update plato.' });
    }
});









app.listen(process.env.PORT,()=>{
    console.log("Server ON ")
})

