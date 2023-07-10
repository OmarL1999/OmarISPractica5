import { IsUUID } from 'class-validator';
import { CreateCanchaInput } from './create-cancha.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCanchaInput extends PartialType(CreateCanchaInput) {

  @Field(() => ID)
  @IsUUID()
  id: string;
  
}
