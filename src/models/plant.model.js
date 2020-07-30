// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
mongoose.set('useFindAndModify', false);
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var PlantSchema = Schema({
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'PlantType', required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    health: {type: Boolean, required: true, default: true},
    name: {type: String, required: true, min: 1},
    forest: {type: Boolean, default: false},
    level: {type: Number, default: 1},
    experience: {type: Number, default: 0}
});

// Exportamos el modelo para usarlo en otros ficheros

module.exports = mongoose.model('Plant', PlantSchema);