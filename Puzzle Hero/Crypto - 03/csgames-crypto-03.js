function createMessage(secretKey) {
	var msg = "";
	
	msg += "action=";
	msg += "181qry197b0xztvu22bo0kyiwn5ab1l7vqj4t6cudw2m5mjbap5wyhu3vk43co2n9dgh05of5e1mxo6sr3jmy2o5wzw5nw9apwjh02gsvz74idgy43bggqsjh4xgb1nq49p6dw1dpovrbt8c0mwr5ks77ii1orebzt02jjwsjenff4o3llwdqwvrd2vwyjzfh9d088pq0bvlzg36ydusr";
	
	msg += "; s=" + secretKey;
	return crypt(msg);
}

function crypt(message) {
	// Loading the passphrase //
	var key = KeyLoader.loadKeyFromFile("master.key");
	
	// We are using CryptoJS library (https://code.google.com/p/crypto-js/)  //
	return CryptoJS.AES.encrypt(message, key, { mode: CryptoJS.mode.ECB, padding : CryptoJS.pad.NoPadding });
}