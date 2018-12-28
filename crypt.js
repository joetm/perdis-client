#!/usr/bin/env node

var CryptoJS = require("crypto-js");

// Encrypt
var ciphertext = CryptoJS.AES.encrypt('jonas.oppenlaender@oulu.fi', '8723ikhgjsKJDH*&#IU#JR#(UFDJSDG337hgea').toString();

console.log(ciphertext); // 'my message'

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, '8723ikhgjsKJDH*&#IU#JR#(UFDJSDG337hgea');
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'
