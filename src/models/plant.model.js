// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var PlantSchema = Schema({
    type: {type: String, required: true},
    user_id: {type: String, required: true},
    health: {type: Number, default: 100},
    name: {type: String, required: true},
    forest: {type: Boolean, default: false},
    level: {type: Number, default: 0},
    experience: {type: Number, default: 0}
});

// Exportamos el modelo para usarlo en otros ficheros

module.exports = mongoose.model('Plant', PlantSchema);