import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class CreatePlatoInput {

  @Field(()=>String )
  @IsNotEmpty()
  nombre:string;


  @Field(()=>Boolean )
  @IsOptional()
  estado:boolean;

  
}