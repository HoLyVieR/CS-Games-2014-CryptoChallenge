function toHex (str) {
	var r = "";
	var i;
	var letter = "0123456789abcdef";
	
	for (i=0; i<str.length; i++) {
		r += letter[str.charCodeAt(i)  >> 4] + letter[str.charCodeAt(i) & 15];
	}
	
	return r;
}

function encrypt(text, password) {
	var i;
	var r = "";
	
	for (i=0; i<text.length; i++) {
		r += String.fromCharCode(text.charCodeAt(i) ^ password.charCodeAt(i % password.length));
	}
	
	return toHex(r);
}