// ? Import Influx library
const Influx = require("influx");

// ? Establish connection
const client = new Influx.InfluxDB({
	database: "iudx",
	host: process.env.HOST,
	port: 8086,
	username: process.env.UNAME,
	password: process.env.PASSWORD,
});

const lastTimestamp = 1629052200000;

const getDataWeek = async (req, res, next) => {
	const today = new Date(lastTimestamp);
	const lastWeek = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - 7
	);

	try {
		const results = await client.query(
			`select * from covid_data where time >= ${lastWeek.getTime()} AND time <= ${today.getTime()}`
		);
		res.json({ results: results });
	} catch (err) {
		console.log(err);
	}
};

const getDataMonth = async (req, res, next) => {
	const today = new Date(lastTimestamp);
	const lastMonth = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - 30
	);

	try {
		const results = await client.query(
			`select * from covid_data where time >= ${lastMonth.getTime()} AND time <= ${today.getTime()}`
		);
		res.json({ results: results });
	} catch (err) {
		console.log(err);
	}
};

const threeDayAvg = async (req, res, next) => {
	const today = new Date(lastTimestamp);
	const lastMonth = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - 30
	);
	try {
		const results = await client.query(
			`select moving_average(*, 3)
			from covid_data where time >= ${lastMonth.getTime()} AND time <= ${today.getTime()}`
		);
		res.json({ results: results });
	} catch (err) {
		console.log(err);
	}
};

exports.getDataWeek = getDataWeek;
exports.getDataMonth = getDataMonth;
exports.threeDayAvg = threeDayAvg;

// select * from covid_data where time >= '2021-08-08T18:30:00.000Z' AND time <= '2021-08-15T18:30:00.000Z'
