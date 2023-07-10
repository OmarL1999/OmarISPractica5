import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { PlatoService } from './plato.service';
import { Plato } from './entities/plato.entity';
import { CreatePlatoInput } from './dto/create-plato.input';
import { UpdatePlatoInput } from './dto/update-plato.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Plato)
export class PlatoResolver {
  constructor(private readonly platoService: PlatoService) {}

  @Mutation(() => Plato)
  async createPlato(@Args('createPlatoInput') createPlatoInput: CreatePlatoInput)
  :Promise<Plato> {
    return this.platoService.create(createPlatoInput);
  }

  @Query(() => [Plato], { name: 'platos' })
  async findAll():Promise<Plato[]> {
    return this.platoService.findAll();
  }

  @Query(() => Plato, { name: 'plato' })
  findOne(@Args('id', { type: () => ID}, ParseUUIDPipe ) id: string): Promise<Plato> {
    return this.platoService.findOne(id);
  }

  @Mutation(() => Plato)
  updatePlato(@Args('updatePlatoInput') updatePlatoInput: UpdatePlatoInput): Promise<Plato> {
    return this.platoService.update(updatePlatoInput.id, updatePlatoInput);
  }

  @Mutation(() => Plato)
  removePlato(@Args('id', { type: () => ID }) id: string): Promise<Plato> {
    return this.platoService.remove(id);
  }
}
