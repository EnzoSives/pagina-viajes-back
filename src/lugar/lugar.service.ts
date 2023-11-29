import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LugarDTO } from './dto/create-lugar.dto';
import { UpdateLugarDto } from './dto/update-lugar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lugar } from './entities/lugar.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import axios from 'axios';
import * as FormData from 'form-data';
import { validate } from 'class-validator';


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
  // Crear un lugar sin ID asignado
  const lugar = new Lugar(lugarDTO.nombre, lugarDTO.descripcion, lugarDTO.puntuacion);
  lugar.ciudad = await this.ciudadRepository.findOne({ where: { id: lugarDTO.id_ciudad } });

  // Guardar el lugar sin persistirlo en la base de datos
  const lugarGuardado = await this.lugarRepository.save(lugar);

  // Obtener el lugar con su ID asignado (ID provisional)
  const lugarConIdProvisional = await this.lugarRepository.findOne({
    where: { id: lugarGuardado.id },
  });

  if (!lugarConIdProvisional) {
    throw new Error(`No se pudo obtener el lugar con el ID provisional: ${lugarGuardado.id}`);
  }
  const imgBbUrls = await Promise.all(files.map(async (file, index) => {
    const imgBbUrl = await this.uploadImageToImgBb(file);
    return imgBbUrl;
  }));

  // Asignar las URLs de las imágenes a las propiedades correspondientes en la entidad Lugar
  lugarConIdProvisional.url_image1 = imgBbUrls[0];
  lugarConIdProvisional.url_image2 = imgBbUrls[1];
  lugarConIdProvisional.url_image3 = imgBbUrls[2];
  lugarConIdProvisional.url_image4 = imgBbUrls[3];

  // Guardar el lugar actualizado en la base de datos
  const lugarFinal = await this.lugarRepository.save(lugarConIdProvisional);

  return lugarFinal;
}

private async uploadImageToImgBb(file: Express.Multer.File): Promise<string> {
  const imgBbApiKey = 'b44f4528773f5c89010a350f4400aedc'; 
  const formData = new FormData();

  const compressedImageBuffer = await sharp(file.buffer)
    .resize({ width: 600 , height: 600 }) // Ajusta el tamaño según tus necesidades
    .toBuffer();

  formData.append('image', file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
  });

  try {
    const response = await axios.post('https://api.imgbb.com/1/upload?key=' + imgBbApiKey, formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
      },
    });

    if (response.data && response.data.data && response.data.data.url) {
      const imageUrl = response.data.data.url;
      return imageUrl;
    } else {
      throw new Error('La respuesta de imgBB no contiene la URL esperada.');
    }
  } catch (error) {
    console.error('Error al subir la imagen a imgBB:', error.message);
    throw new Error('Error al subir la imagen a imgBB');
  }
}







private generateImageUrl( fileName: string): string {
  const filePath= (fileName);
  return filePath.split(path.sep).join('/');
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

    // Utiliza sharp para comprimir la imagen antes de guardarla
    sharp(file.buffer)
      .resize({ width: 800, height: 600 })  // Puedes ajustar el tamaño según tus necesidades
      .toFile(filePath, (err, info) => {
        if (err) {
          console.error(`Error al guardar y comprimir la imagen ${file.originalname}: ${err.message}`);
          reject(err);
        } else {
          console.log(`Imagen ${file.originalname} guardada y comprimida exitosamente en ${filePath}`);
          resolve(filePath);
        }
      });
  });
}

private async saveImageToServerWeb(file: Express.Multer.File, nombre: string, id: number): Promise<string> {
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
        const urlPath = filePath.split(path.sep).join('/');
        const imageUrl = `https://www.tusitio.com/${urlPath}`;
        resolve(imageUrl);
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
