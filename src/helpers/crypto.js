import CryptoJS from "crypto-js"

const iv = CryptoJS.enc.Hex.parse("415161718191a1b1");

export default {
    aesEncrypt (input, key) {
        const secretKey = this.modifySecretKey(key);
        const crypted = CryptoJS.AES.encrypt(input, secretKey, {iv: iv});
        return crypted.toString();
    },
    
    aesDecrypt (crypted, key) {
        const secretKey = this.modifySecretKey(key);
        const bytes  = CryptoJS.AES.decrypt(crypted, secretKey, {iv: iv});
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log("originalText", originalText);
        return originalText;
    
    },
    modifySecretKey (key) {        
        const uuid = "bd0242ac1300033a";
        const secretKey = 
            key.length > 16 ? key.substring(0, 16) 
            : key.length === 16 ? key 
            : key + uuid.substring(0, uuid.length - key.length);
        const _key = CryptoJS.enc.Hex.parse(secretKey);
        return _key;
    }
}