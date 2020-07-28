// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var PlantTypeSchema = Schema({
    name: {type: String, required: true},
    legendary: {type: Boolean, required: true},
});

// Exportamos el modelo para usarlo en otros ficheros

module.exports = mongoose.model('PlantType', PlantTypeSchema);