import fs from "node:fs";
import ChildProcess from "node:child_process";

const data = {};

const info = fs.readFileSync("./nodeDB/.dt", "utf8").split("\n");

for (const row of info) {

	if (row.startsWith("//")) {
		continue;
	}

	const splitted = row.split("=");
	data[splitted[0]] = splitted[1]

}



const Operations = [];
const files = [];

for (const arg of process.argv) {

	if (arg.startsWith("--")) {
		Operations.push(arg);
		continue;
	}

	if (arg.startsWith("f:")) {
		files.push(arg.replace("f:", ""));
	}

}

if (Operations.includes("--version")) {
	console.log("------------//------------");
	console.log("Version: " + data["Ver"]);
	console.log("Recomended Node Version: " + data["Node"]);
	console.log("------------//------------");
	process.exit();
}

if (Operations.includes("--start")) {

	for (const file of files) {

		if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {

			throw new Error("invalid file: " + `"${file}"`);

		}

		
		
	}
}