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
	return arr[getRandom(0, 2)];
}

/*
 * Setup:
 * Test: Insert document only with object ID.
 * Notes: Generates the _id field on the client
 *
 */
tests.push({
	name : "amun_asset",
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
			"transactionName" : "playing_game" + getRandom(0,9),
			"trans_desc" : "Chơi game",
			"opening_value" : NumberLong(50925),
			"exchange_value" : NumberLong(-7000),
			"closing_value" : NumberLong(43925),
			"reference_id" : new_guid(),
			"created_time" : new Date().getTime()
		}
	}]
});
