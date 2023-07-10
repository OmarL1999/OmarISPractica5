import { Module } from '@nestjs/common';
import { PlatoService } from './plato.service';
import { PlatoResolver } from './plato.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plato } from './entities/plato.entity';

@Module({
  providers: [PlatoResolver, PlatoService],
  imports:[
    TypeOrmModule.forFeature([Plato])
  ]
})
export class PlatoModule {}
