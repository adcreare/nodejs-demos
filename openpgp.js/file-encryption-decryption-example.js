"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const openpgp = require("openpgp");
// DO NOT show versions OR comments in output files
openpgp.config.show_version = false;
openpgp.config.show_comment = false;
exampleDecryption();
exampleDecryption();
function exampleEncryption() {
    return __awaiter(this, void 0, void 0, function* () {
        // ENCRYPT A FILE
        const publicKey = '-----BEGIN PGP PUBLIC KEY BLOCK-----.......';
        openpgp.initWorker({}); // initialise openpgpjs
        const openpgpPublicKey = openpgp.key.readArmored(publicKey);
        const file = fs.readFileSync('/tmp/file-to-be-encryped');
        const fileForOpenpgpjs = new Uint8Array(file);
        const options = {
            data: fileForOpenpgpjs,
            publicKeys: openpgpPublicKey.keys,
            armor: false
        };
        const encryptionResponse = yield openpgp.encrypt(options); // note the await here - this is async
        const encryptedFile = encryptionResponse.message.packets.write();
        fs.writeFileSync('/tmp/file-encryped', encryptedFile);
    });
}
function exampleDecryption() {
    return __awaiter(this, void 0, void 0, function* () {
        // DECRYPT A FILE
        const privateKey = '-----BEGIN PGP PRIVATE KEY BLOCK-----.......';
        openpgp.initWorker({});
        const openpgpPrivateKeyObject = openpgp.key.readArmored(privateKey).keys[0];
        openpgpPrivateKeyObject.decrypt('PRIVATE KEY PASSWORD');
        const file = fs.readFileSync('/tmp/file-encryped');
        const fileForOpenpgpjs = new Uint8Array(file);
        const options = {
            privateKey: openpgpPrivateKeyObject,
            message: openpgp.message.read(file),
            format: 'binary'
        };
        const decryptionResponse = yield openpgp.decrypt(options);
        const decryptedFile = decryptionResponse.data;
        fs.writeFileSync('/tmp/file-encryped-then-decrypted', decryptedFile);
    });
}
