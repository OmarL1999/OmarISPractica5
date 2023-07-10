import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlatoInput, UpdatePlatoInput } from './dto';
import { Plato } from './entities/plato.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlatoService {

  constructor( 
    @InjectRepository(Plato)
    private readonly platosRepository:Repository<Plato> ){}

  async create(createPlatoInput: CreatePlatoInput): Promise<Plato>  {
    const newPlato= this.platosRepository.create(createPlatoInput);
    return await this.platosRepository.save(newPlato); 
  }

  async findAll(): Promise<Plato[]> {
    return this.platosRepository.find();
  }

  async findOne(id: string): Promise<Plato> {
     const plato= await  this.platosRepository.findOneBy({id});
     if (!plato) throw new NotFoundException(`Not found`)
     return plato;
  }

  async update(id: string, updatePlatoInput: UpdatePlatoInput): Promise<Plato> {
    
    const plato = await this.platosRepository.preload(updatePlatoInput);
    if (!plato) throw new NotFoundException(`Not found`)
    return this.platosRepository.save(plato);

  }

  async remove(id: string): Promise<Plato> {

    const plato= await  this.findOne(id);

    await this.platosRepository.remove(plato);

    return {...plato, id};

  }
}
