import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaisModule } from './pais/pais.module';
import { LugarModule } from './lugar/lugar.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { ContinenteModule } from './continente/continente.module';
import { PreferenciaUsuarioModule } from './preferencia-usuario/preferencia-usuario.module';
import { ImagenesModule } from './imagenes/imagenes.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Cristiano7',
      database: 'db_tp',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
    ,PaisModule, LugarModule, UsersModule, CiudadModule, ContinenteModule, PreferenciaUsuarioModule, ImagenesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
