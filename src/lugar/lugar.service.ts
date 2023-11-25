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

private readonly uploadsPath: string = path.join(__dirname, '..', '..', 'uploads');


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

  const lugarGuardado = await this.lugarRepository.save(lugar);
  const lugarConId = await this.lugarRepository.findOne({ where: { id: lugarGuardado.id } });
  // Guardar las imágenes en el sistema de archivos
  await Promise.all(files.map((file, index) => this.saveImageToServer(file, lugarDTO.nombre, lugarConId.id)));

  if (!lugarConId) {
    throw new Error(`No se pudo obtener el lugar con el ID: ${lugarGuardado.id}`);
  }
  // Resto del código...
  return lugarConId;
}


private generateImageUrl(nombre: string): string {
  return path.join(this.uploadsPath, nombre);
}

private async saveImageToServer(file: Express.Multer.File, nombre: string, id: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const entityFolder = path.join(this.uploadsPath, nombre);
    const entityIdFolder = path.join(entityFolder, id.toString());

    // Crea la carpeta de la entidad y el ID si no existen
    if (!fs.existsSync(entityFolder)) {
      fs.mkdirSync(entityFolder, { recursive: true });
    }
    if (!fs.existsSync(entityIdFolder)) {
      fs.mkdirSync(entityIdFolder, { recursive: true });
    }
    const filePath = path.join(entityIdFolder, `${file.originalname}`);
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        console.error(`Error al guardar la imagen ${file.originalname}: ${err.message}`);
        reject(err);
      } else {
        console.log(`Imagen ${file.originalname} guardada exitosamente en ${filePath}`);
        resolve(filePath);
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
