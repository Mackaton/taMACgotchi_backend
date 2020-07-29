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
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], 
    medals: [{type: mongoose.Schema.Types.ObjectId, ref: 'Medals'}],
    task_challenges:
    [{
        id_task: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
        prom: Number,
        date: Date
    }],
    forest: [{type: mongoose.Schema.Types.ObjectId, ref: 'Plant'}],
    picture: String,
    role: String
});

UserSchema.index({ email: 1, provider: 1 }, { unique: true });

// Exportamos el modelo para usarlo en otros ficheros

module.exports = mongoose.model('User', UserSchema);