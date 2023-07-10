const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActivoSchema = new Schema({
  activotecnologico: String
});

const ActivoModel = mongoose.model('Activo', ActivoSchema);

module.exports = ActivoModel;

