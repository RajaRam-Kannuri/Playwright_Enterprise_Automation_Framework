import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const password = 'secret_sauce'; 

// Generate key & IV (you could reuse an existing one)
const key = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16);  // 128-bit IV

// Encrypt function
function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

const encryptedPassword = encrypt(password);

// Convert key and iv to hex for storage
const keyHex = key.toString('hex');
const ivHex = iv.toString('hex');

// Prepare .env line
const envLines = `
ENCRYPTED_PASSWORD=${encryptedPassword}
ENCRYPTION_KEY=${keyHex}
ENCRYPTION_IV=${ivHex}
`;

// Append to .env file
const envFilePath = path.resolve(__dirname, '../../../.env');
fs.appendFileSync(envFilePath, envLines);

console.log("✅ Password encrypted and saved to .env");
console.log("🔑 ENCRYPTED_PASSWORD =", encryptedPassword);
console.log("🔐 ENCRYPTION_KEY =", keyHex);
console.log("🌀 ENCRYPTION_IV =", ivHex);


console.log('✅ Encrypted password, key, and IV have been added to the .env file.');
export function decrypt(encryptedText: string, key: string, iv: string): string {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

