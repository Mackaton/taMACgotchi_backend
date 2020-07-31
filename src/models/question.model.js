// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
mongoose.set('useFindAndModify', false);
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var QuestionSchema = Schema({
    description: {type: String, required: true, unique: true, min: 3},
    options: [{option: String, value: Number, index: {type: Number, default: 0}}]
});

// Exportamos el modelo para usarlo en otros ficheros

module.exports = mongoose.model('Question', QuestionSchema);