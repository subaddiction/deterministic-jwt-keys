const secp256k1 = require('tiny-secp256k1');
const bip39 = require('bip39');
const bip32 = require('bip32').BIP32Factory(secp256k1);

const jwt = require('jsonwebtoken');
const fs = require('fs');


const args = process.argv.slice(2);
console.log(args);
if(args[0]){
	var seed = args[0];
} else {
	var seed = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
}

const derivationPath = "m/84'/0'/0'/0/0'";
const keypair = bip32.fromSeed(bip39.mnemonicToSeedSync(seed)).derivePath(derivationPath);

console.log("\n");


// TODO optionally output to file
var rawPrivateKey = keypair.privateKey.toString('hex');
console.log("rawPrivateKey", rawPrivateKey);
console.log("\n");

// TODO optionally output to file
var rawPublicKey = keypair.publicKey.toString('hex');
console.log("rawPublicKey", rawPublicKey);
console.log("\n");


const KeyEncoder = require('key-encoder').default;
const keyEncoder = new KeyEncoder('secp256k1');

var pemPrivateKey = keyEncoder.encodePrivate(rawPrivateKey, 'raw', 'pem');
var pemPublicKey = keyEncoder.encodePublic(rawPublicKey, 'raw', 'pem');


console.log(pemPrivateKey);
console.log("\n");


console.log(pemPublicKey);
console.log("\n");

// TODO separate test script
console.log("Test encoding and verifying token");
console.log("\n");

var token = jwt.sign({
	name: 'John Doe',
	email:'john.doe@example.com',
}, pemPrivateKey, { algorithm: 'ES256', noTimestamp:true });

console.log("Encoded JWT");
console.log(token);
console.log("\n");

try{
	var decoded = jwt.verify(token, pemPublicKey);
	console.log("Decoded JWT");
	console.log(decoded);
	console.log("\n");
} catch(e){
	console.log(e);
}
