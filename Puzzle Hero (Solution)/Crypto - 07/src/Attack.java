import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;


public class Attack {
	
	public static void main(String[] args) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		Enc e = new Enc();
		byte[] expectedOut = e.fromHex("d09e268648cc0684a2b34c4b87b017da");
		byte[] expectedIn = "<message><conten".getBytes();
		
		HashMap<String, Integer> meeting = new HashMap<String, Integer>(1 << 22);
		Cipher cipher = Cipher.getInstance("aes/ecb/nopadding");
		
		for (int i=0; i< (1 << 22); i++) {
			SecretKeySpec skeySpec = new SecretKeySpec(e.intToBytes(i), "AES");
			cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
			String res = new String(cipher.doFinal(expectedIn));
			
			meeting.put(res, i);
			
			if (i % 100000 == 0) {
				System.out.println("At :" + i);
			}
		}
        
		for (int i=0; i< (1 << 22); i++) {
			SecretKeySpec skeySpec = new SecretKeySpec(e.intToBytes(i), "AES");
			cipher.init(Cipher.DECRYPT_MODE, skeySpec);
			String res = new String(cipher.doFinal(expectedOut));
			
			if (meeting.containsKey(res)) {
				String p1 = Integer.toString(meeting.get(res), 4);
				String p2 = Integer.toString(i, 4);
				
				while (p1.length() < 11) {
					p1 = "0" + p1;
				}
				
				while (p2.length() < 11) {
					p2 = "0" + p2;
				}
				
				System.out.println(p1 + p2);
				
				Enc e1 = new Enc();
				String aaa = e1.dec(p1 + p2, e.fromHex("d09e268648cc0684a2b34c4b87b017daa15f62d6f0afefc43917deae33ee919babc9b834457f2e3f6d62afe25bef3a7d9cf1fcaf40848950a052f9ee47a4f108d57e1b2220e4c3523f78c28f2baea2beb4d2c72b4e8d7b64d4d63c0a87010c97"));
				System.out.println(new String(e.fromHex(aaa)));
			}
		}
	}

}
