function toHex (str) {
	var r = "";
	var i;
	var letter = "0123456789abcdef";
	
	for (i=0; i<str.length; i++) {
		r += letter[str.charCodeAt(i)  >> 4] + letter[str.charCodeAt(i) & 15];
	}
	
	return r;
}

function fromHex(str) {
	var r = "";
	var i;
	
	for (i=0; i<str.length; i += 2) {
		r += String.fromCharCode(parseInt(str.substr(i, 2), 16));
	}
	
	return r;
}

function XOR(str1, str2) {
	var i;
	var r = "";
	
	for (i=0; i<str2.length; i++) {
		r += String.fromCharCode(str1.charCodeAt(i) ^ str2.charCodeAt(i));
	}
	
	return r;
}

function customEncryptionFunction (pass) {
	var key = KeyLoader.loadKeyFromFile("static.key");
	var iv = SomeHashFunction.hash(key);
	var r = "";
	var block;
	
	for (i=0; i<pass.length; i+=2) {
		block = pass.substr(i, 2);
		r += XOR(iv, block);
		iv = SomeHashFunction.hash(block);
	}
	
	return toHex(r);
}