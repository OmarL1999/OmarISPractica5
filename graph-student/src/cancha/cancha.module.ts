import { Module } from '@nestjs/common';
import { CanchaService } from './cancha.service';
import { CanchaResolver } from './cancha.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancha } from './entities/cancha.entity';

@Module({
  providers: [CanchaResolver, CanchaService],
  imports:[
    TypeOrmModule.forFeature([Cancha])
  ]
})
export class CanchaModule {}
