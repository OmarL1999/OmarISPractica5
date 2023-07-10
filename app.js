require('dotenv').config();
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();


const Activo = require('./models/activo.models');


app.use(express.json());
app.use(cors());

const Conexion = async()=> { 
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log('CONNECTED TO MONGODB!!');
       
    } catch (error) {
        console.log(error)
        throw new Error('FAILED TO CONNECT TO MONGODB')
    }   
  }

Conexion();


app.get('/activos', async (req, res) => {
    console.log('TRYING TO FETCH ActivoS');
    try {
      const Activos = await Activo.find();
      res.status(200).json({
        activos: Activos.map((Activo) => ({
          id: Activo.id,
          activotecnologico: Activo.activotecnologico,
        })),
      });
      console.log('FETCHED Activos');
    } catch (err) {
      console.error('ERROR FETCHING Activos');
      console.error(err.message);
      res.status(500).json({ message: 'Failed to load Activos.' });
    }
});


app.post('/activos', async (req, res) => {
    console.log('TRYING TO STORE activo');
    const activotecnologico = req.body.activotecnologico;
  
    if (!activotecnologico || activotecnologico.trim().length === 0) {
      console.log('INVALID INPUT - NO activotecnologico');
      return res.status(422).json({ message: 'Invalid activo activotecnologico.' });
    }
  
    const activo = new Activo({
      activotecnologico: activotecnologico,
    });
  
    try {
      await activo.save();
      res
        .status(201)
        .json({ message: 'activo saved', activo});
      console.log('STORED NEW activo');
    } catch (err) {
      console.error('ERROR FETCHING activoS');
      console.error(err.message);
      res.status(500).json({ message: 'Failed to save activo.' });
    }
  });

app.put('/activo/:id', async (req, res) => {
    console.log('TRYING TO UPDATE ACTIVO');
    try {
     const {id} = req.params;
     const {...data } =  req.body;
     console.log(id,data)
     await Activo.findByIdAndUpdate(id,data )
    console.log('UPDATE ACTIVO');
    res.status(200).json({ message: 'Actualiza dato' });
    } catch (err) {
      console.error('ERROR FETCHING Activo');
      console.error(err.message);
      res.status(500).json({ message: 'Failed to update Activo.' });
    }
});


app.delete('/activo/:id', async (req, res) => {
    console.log('TRYING TO DELETE Activo');
    try {
         await Activo.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Deleted Activo!' });
      console.log('DELETED Activo');
    } catch (err) {
      console.error('ERROR FETCHING ActivoS');
      console.error(err.message);
      res.status(500).json({ message: 'Failed to delete Activo.' });
    }
  });

  console.log('Hola mundo');


app.listen(process.env.PORT, ()=> { console.log('SERVIDOR INICIADO')});
