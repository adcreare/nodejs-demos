import * as fs from 'fs';
import * as openpgp from 'openpgp';

// DO NOT show versions OR comments in output files
openpgp.config.show_version = false;
openpgp.config.show_comment = false;

exampleDecryption();
exampleDecryption();

async function exampleEncryption(): Promise<void> {


  // ENCRYPT A FILE
  const publicKey: string = '-----BEGIN PGP PUBLIC KEY BLOCK-----.......';

  openpgp.initWorker({}); // initialise openpgpjs
  const openpgpPublicKey = openpgp.key.readArmored(publicKey);

  const file = fs.readFileSync('/tmp/file-to-be-encryped');
  const fileForOpenpgpjs = new Uint8Array(file);

  const options = {
    data:  fileForOpenpgpjs,
    publicKeys: openpgpPublicKey.keys,
    armor: false
  };

  const encryptionResponse = await openpgp.encrypt(options); // note the await here - this is async
  const encryptedFile = encryptionResponse.message.packets.write();

  fs.writeFileSync('/tmp/file-encryped', encryptedFile);
}


async function exampleDecryption(): Promise<void> {

  // DECRYPT A FILE
  const privateKey: string = '-----BEGIN PGP PRIVATE KEY BLOCK-----.......';
  openpgp.initWorker({});

  const openpgpPrivateKeyObject = openpgp.key.readArmored(privateKey).keys[0];
  openpgpPrivateKeyObject.decrypt('PRIVATE KEY PASSWORD');

  const file = fs.readFileSync('/tmp/file-encryped');
  const fileForOpenpgpjs = new Uint8Array(file);

  const options = {
    privateKey: openpgpPrivateKeyObject,
    message: openpgp.message.read(file), // whats the difference between readArmor ?
    format: 'binary'
  };

  const decryptionResponse = await openpgp.decrypt(options);
  const decryptedFile = decryptionResponse.data;

  fs.writeFileSync('/tmp/file-encryped-then-decrypted', decryptedFile);
}


