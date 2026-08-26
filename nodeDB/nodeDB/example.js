import nodeDB from "./frameworkJS/nodeDB.js";

nodeDB.start("myDatabase");

await nodeDB.createSchema("users", [
	{
		name: "id",
		type: nodeDB.registerTypes.uint64,
		pk: true
	},
	{
		name: "name",
		type: nodeDB.registerTypes.string
	},
	{
		name: "age",
		type: nodeDB.registerTypes.uint8
	},
	{
		name: "address_id",
		type: nodeDB.registerTypes.uint64,
		fk: true,
		fkReferencesTo: "addresses"
	}
]);