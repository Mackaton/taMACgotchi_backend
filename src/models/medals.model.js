var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var MedalsSchema = Schema({
    name: {type: String, required: true},
    challenge: {type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true},
});

// Exportamos el modelo para usarlo en otros ficheros

module.exports = mongoose.model('Medals', MedalsSchema);