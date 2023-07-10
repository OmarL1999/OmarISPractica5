const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlatoSchema = new Schema({
  NombrePlato: String
});

const PlatoModel = mongoose.model('Plato', PlatoSchema);

module.exports = PlatoModel;