const mongojs = require("mongojs");
const path = require("path");

const Workout = require("../models/workout");

module.exports = function (app) {
	// HTML ===============================================

	app.get("/", function (req, res) {
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});
	// from rr

	app.get("/exercise", (req, res) => {
		res.sendFile(path.join(__dirname, "../public/exercise.html"));
	});

	app.get("/stats", (req, res) => {
		res.sendFile(path.join(__dirname, "../public/stats.html"));
	});

	// API ================================================

	app.get("/api/workouts", (req, res) => {
		Workout.find()
			.then((workoutdb) => {
				res.json(workoutdb);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	});

	app.get("/api/workouts/range", (req, res) => {
		Workout.find({})
			.then((workoutdb) => {
				console.log("Found");
				res.json(workoutdb);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	});

	app.post("/api/workouts", ({ body }, res) => {
		Workout.create(body)
			.then((workout) => {
				console.log("Created");
				res.json(workout);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	});

	app.put("/api/workouts/:id", async (req, res) => {
		console.log(req.body);
		Workout.updateOne(
			{ _id: mongojs.ObjectId(req.params.id) },
			{ $push: { exercise: req.body } }
		)
			.then((workout) => {
				res.json(workout);
			})

			.catch((err) => {
				res.status(500).json(err);
			});
	});
};
