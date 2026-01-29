import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EncryptionService } from './encryption.service';

@Module({
  imports: [HttpModule],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
