String.prototype.XOR = function (str) {
	var r = "";
	var i;
	var len = Math.max(this.length, str.length);
	
	for (i=0; i<len; i++) {
		r += String.fromCharCode(this.charCodeAt(i % this.length) ^ str.charCodeAt(i % str.length));
	}
	
	return r;
};

String.prototype.fromHex = function() {
	var r = "";
	var i;
	
	for (i=0; i < this.length; i += 2) {
		r += String.fromCharCode(parseInt(this.substr(i, 2), 16));
	}
	
	return r;
};

String.prototype.filter = Array.prototype.filter;
String.prototype.splice = Array.prototype.splice;

String.prototype.hammingDistance = function (str) {
	var i, j;
	var len = this.length;
	var r = 0;
	
	for (i=0; i<len; i++) {
		r += (this.charCodeAt(i) ^ str.charCodeAt(i)).toString(2).replace(/0/g, "").length;
	}
	
	return r;
};

String.prototype.isLikelyEnglishCharset = function (dbg) {
	// This is a basic test to remove anything which contains //
	// control caracter and non-english letter.               //
	if (/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f\x80-\xff]/.test(this)) {
		return -9999999999999;
	}
	
	var flatten = this.toLowerCase();
	var letter = flatten.split("");
	
	// We build the an array of letter ordered by their frequency. //
	var freq = [];
	var set = {};
	
	for (var i=0; i<letter.length; i++) {
		if(!set[letter[i]])  {
			set[letter[i]] = { l : letter[i], f : 1};
			freq.push(set[letter[i]]);
		} else {
			set[letter[i]].f++;
		}
	}
	
	freq.sort(function (a, b) {
		return b.f - a.f;
	});
	
	// We start to score based on the lettre frequency.               
	
	// The scoring is inspired by the Levenstein distance algorithm,  
	// except that here we use 3 operations, insertion, removal and movement.  
	
	// Also, the score is amplified by the expected position of the caracter
	// Not having a space in the string is consider very bad, while missing a "z" is not that important
	var englishFreq = " etaoinshrdlcumwfgypbvkjxqz.,'?!:;0123456789";
	var stringFreq = freq.map(function (a) { return a.l; }).join("");
	var score = 0;
	
	for (var i=0; i<englishFreq.length; i++) {
		if (englishFreq[i] === stringFreq[i]) {
			score += (englishFreq.length - i) * (englishFreq.length - i) * 100;
		} else {
			var pos = stringFreq.indexOf(englishFreq[i]);
			
			if (pos === -1){
				score -= (englishFreq.length - i) * 50;
				stringFreq = stringFreq.splice(i, 0, englishFreq[i]);
			} else {
				score += (englishFreq.length - pos) * 15;
				
				stringFreq = stringFreq.splice(pos, 1);
				stringFreq = stringFreq.splice(i, 0, englishFreq[i]);
			}
		}
	}
	
	score -= (englishFreq.length - stringFreq.length) * 26 * 150;
	
	return score;
};

var str1 = "201c0f09110c531e161a000d1d49110c0314005f570e160d1e001006190f1453010606050b490c01190e531214435207010715041c0d1a00570800051800070450131a00021c5c4427074313150d5303021d07174e000d451f13101a5709000d000e0a091c0053161b0a1f01001d1608500f1610570e11440308040b114f5336030613094e1d110c03151a02020a5e441d08130c150f531a134f020b1c1d024504081d101e0b070a1a454313150d1a0757011b1702490a0413141f1a044f071600084f45111553071e01110d0a1c0d115012161e571c17094e084309150e5d53240a16441a1b0a1604080206124f1311091c064503080753160217104e1f060d1902061f164f02010205060b04040002020a5c443d0c07450304175314001c170b0a170004140153180b1b0b404930001441161f1e1b520100000e49500d12101e011b054e0817451c00101a190613440b1d4f45130e1d0516031e0d1d49150c040016531b0610011c064d45310d1a02020e1f440a000011050c531c050c1b440b050a115c411607571b000d1d1d0a1405045316041b52070107041015410301121b1b1103474336150553101801040502050a1650001f1a061a17104e05060a5c411607571a1e101c00000003411206101a1744060c0d010204011a034f13104049251003021653040a164402000100020e5312570000070749070c1315061e570e1e0d1f1c06115e413e12120c170a0f1a43041408031a040c1b0a0949060915081516190b52090f1c110c0341051a030e17440f050a1405001e5d572213010d0c0d0403411614121b52120b1a170c12141f061a4f06111c190a165e413001161c520b0a000c45111310065b4f11111c1a161650081d53070313070b1b021150121a07570e1f011a45430c1102061f1e1c52051a4915001c08075d57221d160c0043061f0f1406124f110b001f02091c080053180b1b0b4e0c04000441051205060717404922001e04121d570e160d1e001006190f1453050601111d49100014411600034f010b02050a06191506171e015e44180c0f45150d161a110a1c004e050c17150c531b120116160b1b0a115e413216190a130a4e070c0b5004011c044f13104e04021002080053030a1f14011b430605130006044f17104e070c0b500b060003005c442f050a1405001e53121d13104e1f0c0905150312034152290f0c00001e000053010a1e441d08130c150f531e161a000d1d4743281114011a044f07104e050206190f1a12571a000a0f4543000441061f031d1b070b1a43081114011a044152371b1a13001e051a00040a5201090c101111125316100a0644001c0d0650040653010a1c010008170c034f53251e1913091b1a4303150d1a0057021b484e040c091512071a124f1b004e05020a02041607571a06484e0b0f041e051a07570616441b1b0d045e".fromHex();
			
// This first part find the key length //
var bestKeySize = 12;

// The 2nd part finds the key //
var i;
var finalKey = "";

for (i=0; i<bestKeySize; i++) {
	var c;
	var str = str1.filter(function (el, index) { return index % bestKeySize == i; }).join("");
	var bestScore = -9999999999999999999;
	var bestKey = "";

	for (c=0; c<256; c++) {
		var key = new Array(str.length + 1).join(String.fromCharCode(c));
		var res = key.XOR(str);
		var score = res.isLikelyEnglishCharset();
		
		if (score > bestScore) {
			bestScore = score;
			bestKey = String.fromCharCode(c);
		}
	}
	
	finalKey += bestKey;
}

console.log("Key : " + finalKey);

var finalRes = finalKey.XOR(str1);
console.log("Solution : " + finalRes);