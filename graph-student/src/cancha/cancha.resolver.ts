import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CanchaService } from './cancha.service';
import { Cancha } from './entities/cancha.entity';
import { CreateCanchaInput } from './dto/create-cancha.input';
import { UpdateCanchaInput } from './dto/update-cancha.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Cancha)
export class CanchaResolver {
  constructor(private readonly canchaService: CanchaService) {}

  @Mutation(() => Cancha)
  async createCancha(@Args('createCanchaInput') createCanchaInput: CreateCanchaInput)
  :Promise<Cancha> {
    return this.canchaService.create(createCanchaInput);
  }

  @Query(() => [Cancha], { name: 'canchas' })
  async findAll():Promise<Cancha[]> {
    return this.canchaService.findAll();
  }

  @Query(() => Cancha, { name: 'cancha' })
  findOne(@Args('id', { type: () => ID}, ParseUUIDPipe ) id: string): Promise<Cancha> {
    return this.canchaService.findOne(id);
  }

  @Mutation(() => Cancha)
  updateCancha(@Args('updateCanchaInput') updateCanchaInput: UpdateCanchaInput): Promise<Cancha> {
    return this.canchaService.update(updateCanchaInput.id, updateCanchaInput);
  }

  @Mutation(() => Cancha)
  removeCancha(@Args('id', { type: () => ID }) id: string): Promise<Cancha> {
    return this.canchaService.remove(id);
  }
}
