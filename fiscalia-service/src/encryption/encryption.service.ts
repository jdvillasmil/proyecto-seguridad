import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  createCipheriv,
  randomBytes,
  publicEncrypt,
} from 'node:crypto';

@Injectable()
export class EncryptionService {
  private readonly tribunalUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.tribunalUrl =
      process.env.TRIBUNAL_URL || 'http://tribunal-backend:3000';
  }

  async getTribunalKey(): Promise<string> {
    const url = `${this.tribunalUrl}/keys/public`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data.key;
  }

  encryptData(
    data: any,
    publicKeyPem: string,
  ): { encryptedData: string; encryptedKey: string; iv: string } {
    // Generar llave simétrica AES-256 (32 bytes)
    const aesKey = randomBytes(32);

    // Generar IV aleatorio (16 bytes)
    const iv = randomBytes(16);

    // Convertir data a string
    const dataString = JSON.stringify(data);

    // Cifrado Simétrico: AES-256-CBC
    const cipher = createCipheriv('aes-256-cbc', aesKey, iv);
    let encryptedData = cipher.update(dataString, 'utf8', 'hex');
    encryptedData += cipher.final('hex');

    // Cifrado Asimétrico: Cifrar la llave AES con la llave pública del tribunal
    const encryptedKey = publicEncrypt(publicKeyPem, aesKey).toString('base64');

    return {
      encryptedData, // hex
      encryptedKey, // base64
      iv: iv.toString('hex'), // hex
    };
  }
}
