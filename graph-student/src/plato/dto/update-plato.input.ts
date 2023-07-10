import { IsUUID } from 'class-validator';
import { CreatePlatoInput } from './create-plato.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePlatoInput extends PartialType(CreatePlatoInput) {

  @Field(() => ID)
  @IsUUID()
  id: string;
  
}
