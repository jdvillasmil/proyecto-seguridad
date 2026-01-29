import { Controller, Get } from '@nestjs/common';
import { KeysService } from './keys.service';

@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Get('public')
  getPublicKey() {
    return {
      key: this.keysService.getPublicKey(),
    };
  }
}
