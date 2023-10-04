import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LugarDTO } from './dto/create-lugar.dto';
import { UpdateLugarDto } from './dto/update-lugar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lugar } from './entities/lugar.entity';
import { FindOneOptions, Repository } from 'typeorm';


@Injectable()
export class LugarService {
  constructor(@InjectRepository(Lugar)
  private lugarRepository : Repository<Lugar>)
{}

public async getAll():Promise<Lugar[]>{
return await this.lugarRepository.find();
}

  
public async getId(id:number) : Promise<Lugar>{
  try{
    const criterio : FindOneOptions =  { where: {id:id} }
    let lugar : Lugar = await this.lugarRepository.findOne( criterio );
    if(lugar)
      return lugar;
    else
      throw new Error(`No se encontro ciudad con id: ${id}`);
  }
  catch(error){
    throw new HttpException(
      {status: HttpStatus.NOT_FOUND,error:`500 - ERROR: ` +error},
      HttpStatus.NOT_FOUND
    )
  }
}

public async addLugar( lugarDTO : LugarDTO ) : Promise<Lugar>{
  try{
    let lugar : Lugar = await this.lugarRepository.save( new Lugar(lugarDTO.nombre) )
    if(lugar)
      return lugar;
    else 
      throw new Error(`No se puedo agregar la ciudad`);
  }
  catch(error){
    throw new HttpException(
      {status: HttpStatus.NOT_FOUND,error:`500 - ERROR: ` +error},
      HttpStatus.NOT_FOUND
    )
  }
}

public async updateLugarId(id:number, lugarDTO : LugarDTO) : Promise<Lugar>{
    try{
      const criterio : FindOneOptions = { where : { id : id} };
      let lugar : Lugar = await this.lugarRepository.findOne(criterio);
      if(lugar){
        lugar.setNombre(lugarDTO.nombre);
        lugar = await this.lugarRepository.save(lugar)
        return lugar;
      }else
      {
        throw new Error(`No se pudo actualizar el id: ${id}`)
      }
    }
    catch(error){
      throw new HttpException(
        {status: HttpStatus.NOT_FOUND,error:`500 - ERROR: ` +error},
        HttpStatus.NOT_FOUND
      )
    }

}

public async deleteLugar(id : number) : Promise<boolean> {
  try {
     let criterio : FindOneOptions = { where: {id: id} };
     let lugar : Lugar = await this.lugarRepository.findOne(criterio);
     if (!lugar)
     throw new Error(`No se pudo actualizar eliminar`)
     else
        await this.lugarRepository.delete(id);
     return true;
  } catch(error){
    throw new HttpException(
      {status: HttpStatus.NOT_FOUND,error:`500 - ERROR: ` +error},
      HttpStatus.NOT_FOUND
    )
  }
}
}
