import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { EncryptionService } from './encryption/encryption.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly encryptionService: EncryptionService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test-secreto')
  async testSecreto(@Body() body: { mensaje: string }) {
    // 1. Obtener la llave pública del tribunal
    const publicKey = await this.encryptionService.getTribunalKey();

    // 2. Cifrar el mensaje usando cifrado híbrido
    const encryptedPackage = this.encryptionService.encryptData(
      { mensaje: body.mensaje },
      publicKey,
    );

    // 3. Retornar el paquete cifrado
    return encryptedPackage;
  }
}
