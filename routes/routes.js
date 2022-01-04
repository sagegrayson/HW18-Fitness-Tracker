const mongojs = require("mongojs");
const path = require("path");

const Workout = require("../models/workout");

module.exports = function (app) {
	//html get routes
	app.get("/stats", (req, res) => {
		res.sendFile(path.join(__dirname, "../public/stats.html"));
	});
	app.get("/exercise", (req, res) => {
		res.sendFile(path.join(__dirname, "../public/exercise.html"));
	});

	// get routes
	//api/workouts
	app.get("/api/workouts", (req, res) => {
		Workout.find()
			.then((dbwork) => {
				res.json(dbwork);
			})
			.catch((err) => {
				res.json(err);
			});
	});
	//api/workouts/range
	app.get("/api/workouts/range", (req, res) => {
		Workout.find({})
			.then((workout) => {
				console.log("Found Workout");
				res.json(workout);
			})
			.catch((err) => {
				res.json(err);
			});
	});
	// put route
	//api/workout/id
	app.put("/api/workouts/:id", async (req, res) => {
		//update push to array exercises $push
		console.log(req.body);
		Workout.updateOne(
			{ _id: mongojs.ObjectId(req.params.id) },
			{ $push: { exercise: req.body } }
		).then((workout) => {
			res.json(workout);
		});
	});

	// api/workouts

	app.post("/api/workouts", ({ body }, res) => {
		Workout.create(body)
			.then((workout) => {
				console.log("Workout Created!");
				res.json(workout);
			})
			.catch((err) => {
				res.json(err);
			});
	});
};
