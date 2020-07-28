// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var UserSchema = Schema({
    email: {type: String, required: true},
    provider: {type: String, required: true},
    name: {type: String, required: true},
    carbon:
    [{
        value: Number,
        date: Date
    }],
    friends: [String], 
    medals: [String],
    task_challenges:
    [{
        id_task: String,
        prom: Number,
        date: Date
    }],
    forest: [String],
    picture: String,
    role: String
});

// Exportamos el modelo para usarlo en otros ficheros

module.exports = mongoose.model('User', UserSchema);