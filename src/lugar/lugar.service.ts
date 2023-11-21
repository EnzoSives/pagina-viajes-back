import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LugarDTO } from './dto/create-lugar.dto';
import { UpdateLugarDto } from './dto/update-lugar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lugar } from './entities/lugar.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class LugarService {
  constructor(@InjectRepository(Lugar)
  private lugarRepository : Repository<Lugar>,
  @InjectRepository(Ciudad)
  private ciudadRepository : Repository<Ciudad>)
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

async agregarLugar(lugarDTO: LugarDTO, files: Express.Multer.File[]): Promise<Lugar> {
  const lugar = new Lugar(lugarDTO.nombre, lugarDTO.descripcion);
  lugar.ciudad = await this.ciudadRepository.findOne({ where: { id: lugarDTO.id_ciudad } });

  // Asignar las URLs de las imágenes a las propiedades correspondientes en la entidad Lugar
  lugar.url_image1 = this.generateImageUrl(lugarDTO.nombre);
  lugar.url_image2 = this.generateImageUrl(lugarDTO.nombre);
  lugar.url_image3 = this.generateImageUrl(lugarDTO.nombre);
  lugar.url_image4 = this.generateImageUrl(lugarDTO.nombre);

  // Guardar las imágenes en el sistema de archivos
  await Promise.all(files.map((file, index) => this.saveImageToServer(file, lugarDTO.nombre, index + 1)));

  // Guardar el lugar en la base de datos
  const lugarGuardado = await this.lugarRepository.save(lugar);

  // Resto del código...

  return lugarGuardado;
}

private generateImageUrl(nombre: string): string {
  return `./uploads/${nombre}/`;
}

private saveImageToServer(file: Express.Multer.File, entidad: string, index: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const entityFolder = path.join(__dirname, '..', '..', 'uploads', entidad);

    // Crea la carpeta de la entidad si no existe
    if (!fs.existsSync(entityFolder)) {
      fs.mkdirSync(entityFolder, { recursive: true });
    }

    const filePath = path.join(entityFolder, `${index}_${file.originalname}`);
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        console.error(`Error al guardar la imagen ${index}: ${err.message}`);
        reject(err);
      } else {
        console.log(`Imagen ${index} guardada exitosamente.`);
        resolve();
      }
    });
  });
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
