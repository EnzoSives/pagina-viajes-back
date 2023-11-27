import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './dto/create-ciudad.dto';
import { Pais } from 'src/pais/entities/pais.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Lugar } from 'src/lugar/entities/lugar.entity';

@Injectable()
export class CiudadService {

  constructor(@InjectRepository(Ciudad)
              private ciudadRepository : Repository<Ciudad>,
              @InjectRepository(Pais)
              private paisRepository : Repository<Pais>,
              @InjectRepository(Lugar)
              private lugarRepository : Repository<Lugar>)
  {}

  private readonly uploadsPath: string = path.join(__dirname, '..', '..', 'uploads');

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

  async agregarCiudad(ciudadDTO: CiudadDTO, files: Express.Multer.File[]): Promise<Ciudad> {
    // Crear un país sin ID asignado
    const ciudad = new Ciudad(ciudadDTO.nombre, ciudadDTO.descripcion);
    ciudad.pais = await this.paisRepository.findOne({ where: { id: ciudadDTO.id_pais } });
  
    // Guardar el país sin persistirlo en la base de datos
    const ciudadGuardado = await this.paisRepository.save(ciudad);
  
    // Obtener el país con su ID asignado (ID provisional)
    const ciudadConIdProvisional = await this.paisRepository.findOne({
      where: { id: ciudadGuardado.id },
    });
  
    if (!ciudadConIdProvisional) {
      throw new Error(`No se pudo obtener el país con el ID provisional: ${ciudadGuardado.id}`);
    }
  
    // Guardar las imágenes en el sistema de archivos y obtener las rutas
    const fileNames = await Promise.all(files.map((file, index) =>
      this.saveImageToServer(file, 'ciudad', ciudadConIdProvisional.id)
    ));
  
    // Asignar las URLs de las imágenes a las propiedades correspondientes en la entidad Pais
    ciudadConIdProvisional.url_image1 = this.generateImageUrl(fileNames[0]);
    ciudadConIdProvisional.url_image2 = this.generateImageUrl(fileNames[1]);
    ciudadConIdProvisional.url_image3 = this.generateImageUrl(fileNames[2]);
    ciudadConIdProvisional.url_image4 = this.generateImageUrl(fileNames[3]);
  
    // Guardar el país actualizado en la base de datos
    const ciudadFinal = await this.ciudadRepository.save(ciudadConIdProvisional);
  
    // Resto del código...
  
    return ciudadFinal;
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
