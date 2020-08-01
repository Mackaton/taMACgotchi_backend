// Cargamos el módulo de mongoose
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var UserSchema = Schema({
	username: { type: String, require: true, unique: true, min: 3, max: 12 },
	email: { type: String, required: true, min: 3, max: 50 },
	provider: { type: String, required: true, min: 3, max: 20 },
	name: { type: String, required: true, min: 1, max: 20 },
	lastname: { type: String, required: true, min: 1, max: 20 },
	carbon: [
		{
			value: Number,
			date: Date,
		},
	],
	friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	medals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medals' }],
	task_challenges: [
		{
			task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
			tier: { type: Number, default: 0 },
			status: { type: Boolean, default: true },
			checkday: { type: Boolean, default: null },
			days: { type: Number, default: 0 },
			prom: { type: Number, default: 0 },
			date: { type: Date, default: null },
		},
	],
	challenges_completed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
	forest: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }],
	picture: String,
});

UserSchema.index({ email: 1, provider: 1 }, { unique: true });

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('User', UserSchema);
