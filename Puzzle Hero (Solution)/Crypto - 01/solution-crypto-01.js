function solution(str) {
	var init = 0;
	var i, j;
	var value;
	var out = "";
	var letter = 0;
	
	str = fromHex(str);
	
	for (i=0; i<str.length; i++) {
		value = str.charCodeAt(i);
		letter = 0;
		
		for (j=0; j<4; j++) {
			init    = ((value >> (2*j)) ^ init) & 0x3;
			letter |= init << (2*j);
		}
		
		out += String.fromCharCode(letter);
	}
	
	return out;
}

function fromHex(str) {
	var r = "";
	var i;
	
	for (i=0; i<str.length; i += 2) {
		r += String.fromCharCode(parseInt(str.substr(i, 2), 16));
	}
	
	return r;
}