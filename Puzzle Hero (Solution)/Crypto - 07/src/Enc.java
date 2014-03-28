import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;


public class Enc {
	
	public byte[] intToBytes(int val) {
		return  new byte[]{ 
				(byte) ((val) % 256), 
				(byte) ((val / 256) % 256), 
				(byte) ((val / (256*256)) % 256),
				(byte) ((val / (256*256*256)) % 256), 
				0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0};
	}
	
	public byte[] fromHex(String str) {
		byte[] res = new byte[str.length() / 2];
		
		for (int i=0; i<str.length(); i += 2) {
			res[i / 2] = (byte) Integer.parseInt(str.substring(i, i + 2), 16);
		}
		
		return res;
	}
	
	public String toHex(byte[] bytes) {
		StringBuilder res = new StringBuilder(bytes.length * 2);
		
		for (byte b : bytes) {
			res.append(Integer.toString((b >> 4) & 15, 16));
			res.append(Integer.toString(b & 15, 16));
		}
		
		return res.toString();
	}
	
	public byte[] aesDec(byte[] key, byte[] data) {
		try {
			byte[] iv ={0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};
			IvParameterSpec ips = new IvParameterSpec(iv);
			
	        SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
	        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
	        cipher.init(Cipher.DECRYPT_MODE, skeySpec, ips);
	        return cipher.doFinal(data);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	public byte[] aesEnc(byte[] key, byte[] data) {
		try {
			byte[] iv ={0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};
			IvParameterSpec ips = new IvParameterSpec(iv);
			
	        SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
	        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
	        cipher.init(Cipher.ENCRYPT_MODE, skeySpec, ips);
	        return cipher.doFinal(data);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	public String dec(String key, byte[] data) {
		int ik1 = Integer.parseInt(key.substring(00, 11), 4);
		int ik2 = Integer.parseInt(key.substring(11, 22), 4);
		
		byte[] k1 = intToBytes(ik1);
		byte[] k2 = intToBytes(ik2);
		
		byte[] out = aesDec(k1, aesDec(k2, data));
		return toHex(out);
	}
	
	public String enc(String key, byte[] data) {
		int ik1 = Integer.parseInt(key.substring(00, 11), 4);
		int ik2 = Integer.parseInt(key.substring(11, 22), 4);
		
		byte[] k1 = intToBytes(ik1);
		byte[] k2 = intToBytes(ik2);
	
		// Double AES encrypt, must mean twice as secure ... //
		byte[] out = aesEnc(k2, aesEnc(k1, data));
		return toHex(out);
	}
}