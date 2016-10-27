if ( typeof (tests) != "object") {
	tests = [];
}

/*
 * Setup:
 * Test: Insert document only with object ID.
 * Notes: Generates the _id field on the client
 *
 */
tests.push({
	name : "Insert.AMUN_ID",
	tags : ['insert', 'core'],
	pre : function(collection) {
		collection.drop();
	},
	ops : [{
		op : "insert",
		doc : {
			_id : {
				"#OID" : 1
			},
			"user_asset_id" : "dca93be5-64ca-4f4c-bd0f-a06f6611faf9",
			"user_id" : "52a495b9-5a87-4f73-b0bc-7cc48bf8fcc4",
			"assetName" : "chip",
			"application_id" : "14a5e5f3-2962-42f9-8a7c-fae36c4b9307",
			"transaction_type_id" : "a913ef0d-9c4f-4eda-a4b4-31a36fb1821d",
			"transactionName" : "playing_game",
			"trans_desc" : "Chơi game",
			"opening_value" : NumberLong(50925),
			"exchange_value" : NumberLong(-7000),
			"closing_value" : NumberLong(43925),
			"reference_id" : "6461290f-254c-4398-9fe9-b2d07a5f1d45",
			"created_time" : 1472026914
		}
	}]
});
