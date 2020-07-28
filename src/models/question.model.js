// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var QuestionSchema = Schema({
    description: {type: String, required: true},
});

// Exportamos el modelo para usarlo en otros ficheros

module.exports = mongoose.model('Question', QuestionSchema);