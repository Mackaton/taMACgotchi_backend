var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var ChallengeSchema = Schema({
	category : { type: String, required: true, min: 3 },
	description: { type: String, required: true, unique: true, min: 3 },
    tier : {type: Number, required: true, min: 1},
    duration: {type: Number, required: true, min:1},
    value: { type: Number, required: true },
});

// Exportamos el modelo para usarlo en otros ficheros

module.exports = mongoose.model('Challenge', ChallengeSchema);