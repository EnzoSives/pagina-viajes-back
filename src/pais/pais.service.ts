import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Pais } from './entities/pais.entity';
import { PaisDTO } from './dto/create-pais.dto';
import { Continente } from 'src/continente/entities/continente.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import axios from 'axios';
import * as FormData from 'form-data';



@Injectable()
export class PaisService {
  constructor(@InjectRepository(Pais)
  private paisRepository : Repository<Pais>,
  @InjectRepository(Continente)
  private continenteRepository : Repository<Continente>)
{}

private readonly uploadsPath: string = path.join(__dirname, '..', '..', 'uploads');

public async getAll():Promise<Pais[]>{
return await this.paisRepository.find();
}

  
public async getId(id:number) : Promise<Pais>{
  try{
    const criterio : FindOneOptions =  { where: {id:id} }
    let pais : Pais = await this.paisRepository.findOne( criterio );
    if(pais)
      return pais;
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

async agregarPais(paisDTO: PaisDTO, files: Express.Multer.File[]): Promise<Pais> {
  // Crear un país sin ID asignado
  const pais = new Pais(paisDTO.nombre, paisDTO.descripcion);
  pais.continente = await this.continenteRepository.findOne({ where: { id: paisDTO.id_continente } });

  // Guardar el país sin persistirlo en la base de datos
  const paisGuardado = await this.paisRepository.save(pais);

  // Obtener el país con su ID asignado (ID provisional)
  const paisConIdProvisional = await this.paisRepository.findOne({
    where: { id: paisGuardado.id },
  });

  if (!paisConIdProvisional) {
    throw new Error(`No se pudo obtener el país con el ID provisional: ${paisGuardado.id}`);
  }

 // Guardar las imágenes en el sistema de archivos y obtener las rutas
 const imgBbUrls = await Promise.all(files.map(async (file, index) => {
  const imgBbUrl = await this.uploadImageToImgBb(file);
  return imgBbUrl;
}));

// Asignar las URLs de las imágenes a las propiedades correspondientes en la entidad Lugar
paisConIdProvisional.url_image1 = imgBbUrls[0];
paisConIdProvisional.url_image2 = imgBbUrls[1];
paisConIdProvisional.url_image3 = imgBbUrls[2];
paisConIdProvisional.url_image4 = imgBbUrls[3];

// Guardar el lugar actualizado en la base de datos
const paisFinal = await this.paisRepository.save(paisConIdProvisional);

return paisFinal;
}

private async uploadImageToImgBb(file: Express.Multer.File): Promise<string> {
const imgBbApiKey = 'b44f4528773f5c89010a350f4400aedc'; 
const formData = new FormData();

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

public async updatePaisId(id:number, paisDTO : PaisDTO) : Promise<Pais>{
    try{
      const criterio : FindOneOptions = { where : { id : id} };
      let pais : Pais = await this.paisRepository.findOne(criterio);
      if(pais){
        pais.setNombre(paisDTO.nombre);
        pais = await this.paisRepository.save(pais)
        return pais;
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

public async deletePais(id : number) : Promise<boolean> {
  try {
     let criterio : FindOneOptions = { where: {id: id} };
     let pais : Pais = await this.paisRepository.findOne(criterio);
     if (!pais)
     throw new Error(`No se pudo actualizar eliminar`)
     else
        await this.paisRepository.delete(id);
     return true;
  } catch(error){
    throw new HttpException(
      {status: HttpStatus.NOT_FOUND,error:`500 - ERROR: ` +error},
      HttpStatus.NOT_FOUND
    )
  }
}
}
