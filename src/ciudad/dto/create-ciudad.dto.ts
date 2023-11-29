import { IsString, IsInt, Min, Max } from 'class-validator';

export class CiudadDTO{
    readonly nombre : string;
    readonly descripcion : string;
    @IsInt()
    @Min(1, { message: 'La puntuación debe ser como mínimo 1.' })
    @Max(5, { message: 'La puntuación debe ser como máximo 5.' })
    readonly puntuacion : number;
    readonly id_pais : number;
    //TODO:Agregar lista de imagenes
}
