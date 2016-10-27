if ( typeof (tests) != "object") {
	tests = [];
}

var arr = ["gold", "chip", "vip"];
function S4() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function new_guid() {
	return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function get_asset() {
	return arr[parseInt(getRandom(0, 2))];
}

/*
 * Setup:
 * Test: Insert document only with object ID.
 * Notes: Generates the _id field on the client
 *
 */
tests.push({
	name : "amun_asset_insert",
	tags : ['insert', 'core'],
	pre : function(collection) {
	},
	ops : [{
		op : "insert",
		doc : {
			_id : {
				"#OID" : 1
			},
			"user_asset_id" : new_guid(),
			"user_id" : new_guid(),
			"assetName" : get_asset(),
			"application_id" : new_guid(),
			"transaction_type_id" : new_guid(),
			"transactionName" : "playing_game" + getRandom(0, 9),
			"trans_desc" : "Chơi game",
			"opening_value" : NumberLong(getRandom(0, 50925)),
			"exchange_value" : NumberLong(-getRandom(0, 1000)),
			"closing_value" : NumberLong(getRandom(0, 43925)),
			"reference_id" : new_guid(),
			"created_time" : new Date().getTime()
		}
	}]
});

/*
 * Setup: Populate a collection with an integer field X set to 0
 *        and integer _id field
 * Test:  Each thread works in a range of 100 documents; randomly selects a
 *        document based on the integer _id field and increments X
 */
tests.push({
	name : "amun_asset_update",
	tags : ['update', 'regression'],
	pre : function(collection) {
	},
	ops : [{
		op : "update",
		query : {
			assetName : get_asset()
		},
		update : {
			$inc : {
				"created_time" : new Date().getTime(),
				"opening_value" : NumberLong(getRandom(0, 50925)),
				"exchange_value" : NumberLong(-getRandom(0, 1000)),
				"closing_value" : NumberLong(getRandom(0, 43925))
			}
		}
	}]
});

/*
 * Setup: Create collection of documents with only integer _id field
 * Test: Query for random document based on _id field. Each thread
 *       accesses a distinct range of documents.
 */
tests.push({
	name : "amun_asset_findOne",
	tags : ['query', 'regression'],
	pre : function(collection) {		
	},
	ops : [{
		op : "findOne",
		query : {
			assetName : get_asset()
		}
	}]
}); 