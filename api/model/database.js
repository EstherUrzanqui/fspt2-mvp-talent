require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
	host: DB_HOST || "127.0.0.1",
	user: DB_USER || "root",
	password: DB_PASS,
	database: DB_NAME || "covid_talent",
	multipleStatements: true,
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");

	let useDatabase = `USE ${DB_NAME};`;
    con.query(useDatabase, function (err, result){
        if(err) throw err;
        console.log('Connection to `covid_talent` database was successful');
	});

	let dropChildTables = 
		"DROP TABLE if exists companies_candidates; DROP TABLE if exists candidates_skills;";
	con.query(dropChildTables, function (err, result) {
		if (err) throw err;
		console.log("Table deletion `companies_candidates and candidates_skills` was successful!");
	
		console.log("Closing...");
	});

	let createCandidateQuery =
		"DROP TABLE if exists candidates; CREATE TABLE candidates(id int NOT NULL AUTO_INCREMENT, firstname varchar(30) NOT NULL,lastname varchar(30) NOT NULL, email_address varchar(30) NOT NULL, mother_tongue varchar(100) NOT NULL DEFAULT '1', department varchar(100) NOT NULL DEFAULT '1', experience varchar(255) NOT NULL, relocation BOOLEAN NOT NULL DEFAULT '1', remote BOOLEAN NOT NULL DEFAULT '1', PRIMARY KEY (`id`));";
	con.query(createCandidateQuery, function (err, result) {
		if (err) throw err;
		console.log("Table creation `candidates` was successful!");

		console.log("Closing...");
	});

	let createCompanyQuery =
		"DROP TABLE if exists companies; CREATE TABLE companies(id int NOT NULL AUTO_INCREMENT, name varchar(155) NOT NULL, city varchar(100) NOT NULL, PRIMARY KEY (`id`));";
	con.query(createCompanyQuery, function (err, result) {
		if (err) throw err;
		console.log("Table creation `companies` was successful!");

		console.log("Closing...");
	});

	let createSkillsQuery =
		"DROP TABLE if exists skills; CREATE TABLE skills(id int NOT NULL AUTO_INCREMENT, title varchar(100), description varchar(100), PRIMARY KEY (`id`));";
	con.query(createSkillsQuery, function (err, result) {
		if (err) throw err;
		console.log("Table creation `skills` was successful!");

		console.log("Closing...");
	});

	let createCompanyCandidateQuery =
		"CREATE TABLE companies_candidates(candidate_id int NOT NULL, company_id int NOT NULL, FOREIGN KEY(candidate_id) REFERENCES candidates(id), FOREIGN KEY(company_id) REFERENCES companies(id));";
	con.query(createCompanyCandidateQuery, function (err, result) {
		if (err) throw err;
		console.log("Table creation `companies_candidates` was successful!");

		console.log("Closing...");
	});

	let createCandidateSkillsQuery =
		"CREATE TABLE candidates_skills(candidate_id int NOT NULL, skills_id int NOT NULL, FOREIGN KEY(candidate_id) REFERENCES candidates(id), FOREIGN KEY(skills_id) REFERENCES skills(id));";
	con.query(createCandidateSkillsQuery, function (err, result) {
		if (err) throw err;
		console.log("Table creation `candidates_skills` was successful!");

		console.log("Closing...");
		});



	con.end();
});
