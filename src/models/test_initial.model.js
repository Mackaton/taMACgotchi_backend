// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');

mongoose.set('useFindAndModify', false);
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var TestInitialSchema = Schema({
    results:
    [{
        id_question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
        value: Number
    }],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: Date,
    prom_carbon: {type: Number}
});

// Exportamos el modelo para usarlo en otros ficheros

module.exports = mongoose.model('TestInitial', TestInitialSchema);