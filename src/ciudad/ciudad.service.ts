import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './dto/create-ciudad.dto';
import { Pais } from 'src/pais/entities/pais.entity';

@Injectable()
export class CiudadService {

  constructor(@InjectRepository(Ciudad)
              private ciudadRepository : Repository<Ciudad>,
              @InjectRepository(Pais)
              private paisRepository : Repository<Pais>)
  {}

  public async getAll():Promise<Ciudad[]>{
     return await this.ciudadRepository.find();
  }
  
  public async getId(id:number) : Promise<Ciudad>{
    try{
      const criterio : FindOneOptions =  { where: {id:id} }
      let ciudad : Ciudad = await this.ciudadRepository.findOne( criterio );
      if(ciudad)
        return ciudad;
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

  public async addCiudad( ciudadDTO : CiudadDTO ) : Promise<Ciudad>{
    try{
      let ciudad : Ciudad = new Ciudad(ciudadDTO.nombre, ciudadDTO.descripcion) 
      ciudad.pais = await this.paisRepository.findOne({where:{id:ciudadDTO.id_pais}})
      if(ciudad){
        return await this.ciudadRepository.save(ciudad);
      }
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

  public async updateCiudadId(id:number, ciudadDTO : CiudadDTO) : Promise<Ciudad>{
      try{
        const criterio : FindOneOptions = { where : { id : id} };
        let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
        if(ciudad){
          ciudad.setNombre(ciudadDTO.nombre);
          ciudad = await this.ciudadRepository.save(ciudad)
          return ciudad;
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

  public async deleteCiudad(id : number) : Promise<boolean> {
    try {
       let criterio : FindOneOptions = { where: {id: id} };
       let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
       if (!ciudad)
       throw new Error(`No se pudo actualizar eliminar`)
       else
          await this.ciudadRepository.delete(id);
       return true;
    } catch(error){
      throw new HttpException(
        {status: HttpStatus.NOT_FOUND,error:`500 - ERROR: ` +error},
        HttpStatus.NOT_FOUND
      )
    }
 }


}
