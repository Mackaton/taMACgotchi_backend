// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var TaskSchema = Schema({
    name: {type: String, required: true},
    challenge: {type: Boolean, required: true},
    tier: {type: Number, default: 100},
    value: {type: Number, required: true},
});

// Exportamos el modelo para usarlo en otros ficheros

module.exports = mongoose.model('Task', TaskSchema);