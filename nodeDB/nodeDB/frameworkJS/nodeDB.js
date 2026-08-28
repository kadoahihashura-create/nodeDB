import fs from "node:fs/promises";
import fsSync from "node:fs";
import http from "node:http";
const registerTypes = Object.freeze({

	int8: 0,
	uint8: 1,

	int16: 2,
	uint16: 3,

	int32: 4,
	uint32: 5,

	int64: 6,
	uint64: 7,

	float32: 8,
	float64: 9,

	char: 10,
	string: 11,
	boolean: 12,

	bin: 13

});

const config = {
	isReady: false,
	name: "",
    port: undefined
}

function start(name, port = 127) {
	
	if (name == undefined) name = "nodeDBDefault";

	if (typeof name !== "string" || name.length == 0) {
		
		throw new Error("Name must be a non-empty string.");
		
	}

    if (typeof port !== "number" || (port < 1 || port > 65535)) {
        throw new Error("Please, use a valid port!");
    }

    config.port = port;
	config.name = name;
	
	try {

		if (!fsSync.existsSync(name)) {

			fsSync.mkdirSync(name);

		}

	} catch (err) {

		throw err;
		
	}
    
	config.isReady = true;
}

function isReady() {
	if (!config.isReady) {
		throw new Error("Nothing has been prepared. Please use the \"start()\" function.");
	}
}

const localServer = http.createServer((req, res) => {

	// unfinished. Waiting for index page! (:

});

function debugServerListen() {

	isReady();
	localServer.listen(config.port, "localhost");
	
}

function verifyRowValidity(row) {

	if (typeof row !== "object" || row === null) {
		return false;
	}

	if (typeof row.name !== "string") {
		return false;
	}

	if (!Object.values(registerTypes).includes(row.type)) {
		return false;
	}

	if (typeof row.pk !== "boolean" && typeof row.pk !== "undefined") {
		return false;
	}

	if (typeof row.fk !== "boolean" && typeof row.fk !== "undefined") {
		return false;
	}

	if (row.fk === true) {

		if (typeof row.fkReferencesTo !== "string") {
			return false;
		}

	}

	return true;

}



async function createSchema(name, rows) {

	isReady();	

	if (typeof name !== "string" || name.length === 0) {
		throw new Error("Wrong type given for schema name!");
	}

	if (!Array.isArray(rows)) {
		throw new Error("Rows must be an array!");
	}

	let final = "\"" + name + "\" \n ";

	const usedNames = new Set();

	for (const row of rows) {

		if (!verifyRowValidity(row)) {
			throw new Error("Invalid schema row!");
		}

		if (usedNames.has(row.name)) {
			throw new Error(`Duplicate column name: ${row.name}`);
		}

		usedNames.add(row.name);

		final += `"${row.name}"`;
		final += " | " + Object.keys(registerTypes).find(
			key => registerTypes[key] === row.type
		);
		final += " | " + (row.pk === true);
		final += " | " + (row.fk === true);

		if (row.fk === true) {
			final += " | " + row.fkReferencesTo;
		}

		final += " \n ";
	}

	final += " % ";

	try {

		await fs.writeFile(
			`${config.name}/${name}.schema`,
			final,
			"utf8"
		);

	} catch (err) {

		throw new Error(
			`Couldn't create schema "${name}": ${err.message}`
		);

	}

	return final;
}

export default {

	start,
	createSchema,
	registerTypes,
    debugServerListen    

}
