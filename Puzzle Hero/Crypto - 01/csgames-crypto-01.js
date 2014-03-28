function toHex (str) {
	var r = "";
	var i;
	var letter = "0123456789abcdef";
	
	for (i=0; i<str.length; i++) {
		r += letter[str.charCodeAt(i)  >> 4] + letter[str.charCodeAt(i) & 15];
	}
	
	return r;
};

function myCustomAlgorithm(str) {
	var init = 0;
	var i;
	var out = "";
	var value;
	
	for (i=0; i<str.length; i++) {
		value = str.charCodeAt(i);
		init ^= (value << 2) ^ value;
		out  += String.fromCharCode(init & 0xff);
		init >>= 8;
	}
	
	return toHex(out);
}