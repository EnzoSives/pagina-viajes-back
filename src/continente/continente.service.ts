import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ContinenteDTO } from './dto/create-continente.dto';
import { UpdateContinenteDto } from './dto/update-continente.dto';
import { Continente } from './entities/continente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ContinenteService {

  constructor(@InjectRepository(Continente)
  private continenteRepository : Repository<Continente>)
{}

public async getAll():Promise<Continente[]>{
return await this.continenteRepository.find();
}

  
public async getId(id:number) : Promise<Continente>{
  try{
    const criterio : FindOneOptions =  { where: {id:id} }
    let continente : Continente = await this.continenteRepository.findOne( criterio );
    if(continente)
      return continente;
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

public async addContinente( continenteDTO : ContinenteDTO ) : Promise<Continente>{
  try{
    let continente : Continente = await this.continenteRepository.save( new Continente(continenteDTO.nombre) )
    if(continente)
      return continente;
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

public async updateContinenteId(id:number, continenteDTO : ContinenteDTO) : Promise<Continente>{
    try{
      const criterio : FindOneOptions = { where : { id : id} };
      let continente : Continente = await this.continenteRepository.findOne(criterio);
      if(continente){
        continente.setNombre(continenteDTO.nombre);
        continente = await this.continenteRepository.save(continente)
        return continente;
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

public async deleteContinente(id : number) : Promise<boolean> {
  try {
     let criterio : FindOneOptions = { where: {id: id} };
     let continente : Continente = await this.continenteRepository.findOne(criterio);
     if (!continente)
     throw new Error(`No se pudo actualizar eliminar`)
     else
        await this.continenteRepository.delete(id);
     return true;
  } catch(error){
    throw new HttpException(
      {status: HttpStatus.NOT_FOUND,error:`500 - ERROR: ` +error},
      HttpStatus.NOT_FOUND
    )
  }
}

}
