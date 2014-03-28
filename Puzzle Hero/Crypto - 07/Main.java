
public class Main {
	
	public static void main(String[] args) {
		if (args.length < 3) {
			System.out.println("Usage : [decrypt|encrypt] [key (22 digits base 4)] [data]");
			return;
		}
		
		String key = args[1];
		String data = args[2];
		
		if (args[0].equals("encrypt")) {
			// Because XML is always better. //
			StringBuilder wrapper = new StringBuilder();
			wrapper.append("<message><content>");
			wrapper.append(data);
			wrapper.append("</content></message>");
			
			Enc e = new Enc();
			String res = e.enc(key, wrapper.toString().getBytes());
			System.out.println(res);
		}
		
		if (args[0].equals("decrypt")) {
			Enc e = new Enc();
			String res = e.dec(key, e.fromHex(data));
			System.out.println(res);
		}
	}
}