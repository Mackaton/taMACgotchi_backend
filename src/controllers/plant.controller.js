const Plant = require('../models/plant.model');
const TypePlant = require('../models/plant_type.model');
const User = require('../models/user.model');

// Auxiliar Functions

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const picture = 'https://storagepictures-cos-standard-37s.s3.us-south.cloud-object-storage.appdomain.cloud/'
class TypePlantController {

	//-----------------------------------------------------------------------//
    //                              GETS CONTROLLERS
    //-----------------------------------------------------------------------//

	// get actual plant user
	async userPlant(req, res) {
        const { userId } = req.params;
        let type, state, lvl
		try {
            const actualPlant = await Plant.findOne({ user: userId, forest: false }).populate('type', 'name');

            // Picture URL
            type = actualPlant.type.name
            lvl = actualPlant.level
            if (actualPlant.health == true) {
                // Good
                state = 'G'
            } else {
                // Bad
                state = 'B'
            }

			res.status(200).json({actualPlant, url: `${picture}${type}t${lvl}${state}.png`});
		} catch (error) {
			console.log(error);
		}
    }

    // get all owned plants in forest
    async userForestPlants(req, res) {
        const { userId } = req.params;
        let forestResume = []
		try {
            const forestPlants = await Plant.find({user: userId, forest: true}).populate('type');
            forestPlants.forEach(plant => {
                forestResume.push({
                    plantName: plant.name,
                    plantType: plant.type.name,
                    url: `${picture}${plant.type.name}t3G.png`
                })
            });
			res.status(200).send(forestResume);
		} catch (error) {
			console.log(error);
		}
	}

	//-----------------------------------------------------------------------//
    //                              POSTS CONTROLLERS
    //-----------------------------------------------------------------------//

	// create test plant (para colocar plantas de forma manual, solo para pruebas)
	async createPlantTest(req, res) {
		const { name } = req.body;
		const newPlant = new Plant(req.body);
		try {
			await newPlant.save(async function (error) {
				if (error) return res.status(400).json({ error: `Error en los datos ingresados` });
				res.status(200).json({ message: `Planta TEST ${name} creada` });
			});
		} catch (error) {
			console.log(error);
		}
	}

	// create start new plant
	async createPlant(req, res) {
		let forestPlant = [];
        const { idUser, name } = req.body;

		// Find all plants types owned by the user
        const userForest = await User.findById(idUser).populate('forest');
		userForest.forest.forEach(element => {
			forestPlant.push(element.type);
        });
        console.log('numero de plantas que posee: ', userForest.forest.length)

		// Get random type not owned by the user
		const plantsNotOwned = await TypePlant.find({ _id: { $nin: forestPlant } });
        const posibility = getRandom(0, plantsNotOwned.length);
        const resultTypePlant = plantsNotOwned[posibility]._id;
        console.log('plantas que no posee: ', plantsNotOwned.length);

        // Verify if the user owned all plants
        if (plantsNotOwned.length == 0) {
            res.status(200).json({message: `Felicidades, has obtenido todas las plantas!` })
        }

        // Create new plant
        const newPlant = new Plant({ name, type: resultTypePlant, user: idUser});
        console.log(newPlant.type)

		try {
			await newPlant.save(function (err) {
			if (err) return res.status(400).json({ error: `Error en los datos ${err}` });
			res.status(200).json({ message: `Planta ${name} creada exitosamente` });
			});
		} catch (error) {
			console.error(error);
		}
	}
}

module.exports = TypePlantController;
