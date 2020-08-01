# EcotaMACgotchi (Backend)
Backend de EcoMACgotchi. Realizado por el equipo 2 (MAC) para el Hackaton IBM Call for Code Latinoamerica 2020.

#
Herramientas y versiones:
---------

- NodeJS: 13.7.0
- NPM: 6.13.6

#
Requisitos para ejecutar:
---------

- Nodejs (>=11.x <14.x)
#
Instrucciones:
---------

- Clonar el repo
- Instalar dependencias:
```
$ npm install
```
- Renombrar el archivo .env.example por .env posteriormente llenar las variables con las claves de la BD y el Watson assistence


- Ejecutar el servidor en desarrollo
```
$ npm run dev
```
- Realizar peticiones a http://localhost:3000/ y sus diferentes endpoints (Solicitar endpoints a los desarrolladores)

#
Notas:
---------
- El backend de produccion esta en cloud Foundry
- La gestion de usuarios es manejada por Firebase Authentication
- La base de datos Mongo se encuentra en una instancia de MongoAtlas
- Se utilizo IBM cloud Storage para almancer los assets de las imagenes de las diferentes plantas, medallas y trophies
- Se implemento CD para el despligue rapido de features para los desarrolladores

#
Autores:
---------
- ArriagaAmin (Amin Arriaga) [About me](https://github.com/ArriagaAmin)
- Jkauze (Jesus Kauze) [About me](https://github.com/jkauze)
- DSegura95 (David Segura) [About me](https://github.com/dsegura95)
- MaEscalanteHe (Manuel Escalante) [About me](https://github.com/MaEscalanteHe)
