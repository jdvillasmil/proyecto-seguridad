import { Injectable, OnModuleInit } from '@nestjs/common';
import { generateKeyPairSync } from 'node:crypto';

@Injectable()
export class KeysService implements OnModuleInit {
  private _publicKey: string;
  private _privateKey: string;

  onModuleInit() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    this._publicKey = publicKey;
    this._privateKey = privateKey;

    console.log('[KeysService] Par de claves RSA generado exitosamente');
  }

  getPublicKey(): string {
    return this._publicKey;
  }

  getPrivateKey(): string {
    return this._privateKey;
  }
}
