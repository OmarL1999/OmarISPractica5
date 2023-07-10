import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'platos'})
@ObjectType()
export class Plato {
  
    @PrimaryGeneratedColumn('uuid')
    @Field(()=> ID)
    id:string;
    
    @Column()
    @Field(()=>String)
    nombre:string;

    @Column()
    @Field(()=>Boolean)
    estado:boolean;


}
