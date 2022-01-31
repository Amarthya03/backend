// * LOAD BULK DATA TO INFLUXDB USING API

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

// ? Import axios, for GET requests
const axios = require("axios");

const loadData = async () => {
	let rows;

	try {
		// ? Contacting the API
		data = await axios.get("https://api.covid19india.org/data.json");
		const lis = data.data.cases_time_series;

		rows = lis.map((x) => {
			return {
				measurement: "covid_data",
				fields: {
					dailyconfirmed: Number(x.dailyconfirmed),
					dailydeceased: Number(x.dailydeceased),
					dailyrecovered: Number(x.dailyrecovered),
					date: x.date,
					totalconfirmed: Number(x.totalconfirmed),
					totaldeceased: Number(x.totaldeceased),
					totalrecovered: Number(x.totalrecovered),
				},
				// * Primary key
				timestamp: new Date(x.date).getTime(),
			};
		});

		// ? Write
		await client.writePoints(rows);
		console.log("Data stored successfully!");
	} catch (err) {
		// ! Handle error
		console.log(`Error while processing ${err}`);
	}
};

loadData();
