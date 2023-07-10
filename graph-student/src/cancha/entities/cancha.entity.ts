import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'canchas'})
@ObjectType()
export class Cancha {
  
    @PrimaryGeneratedColumn('uuid')
    @Field(()=> ID)
    id:string;
    
    @Column()
    @Field(()=>String)
    descripcion:string;

    @Column()
    @Field(()=>Boolean)
    estado:boolean;


}
