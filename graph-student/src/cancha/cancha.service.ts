import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCanchaInput, UpdateCanchaInput } from './dto';
import { Cancha } from './entities/cancha.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CanchaService {

  constructor( 
    @InjectRepository(Cancha)
    private readonly canchasRepository:Repository<Cancha> ){}

  async create(createCanchaInput: CreateCanchaInput): Promise<Cancha>  {
    const newCancha= this.canchasRepository.create(createCanchaInput);
    return await this.canchasRepository.save(newCancha); 
  }

  async findAll(): Promise<Cancha[]> {
    return this.canchasRepository.find();
  }

  async findOne(id: string): Promise<Cancha> {
     const cancha= await  this.canchasRepository.findOneBy({id});
     if (!cancha) throw new NotFoundException(`Not found`)
     return cancha;
  }

  async update(id: string, updateCanchaInput: UpdateCanchaInput): Promise<Cancha> {
    
    const cancha = await this.canchasRepository.preload(updateCanchaInput);
    if (!cancha) throw new NotFoundException(`Not found`)
    return this.canchasRepository.save(cancha);

  }

  async remove(id: string): Promise<Cancha> {

    const cancha= await  this.findOne(id);

    await this.canchasRepository.remove(cancha);

    return {...cancha, id};

  }
}
