## Markdown editor web/mobile frontend

El presente proyecto es una versión web de un frontend desacoplado desarrollado en Angular, usando los componentes de Ionic 3.x para la web.

* El presente proyecto se encuentro en desarrollo temprano

## Instalación

Previamente debe tener instalado en su ordenador NodeJS y NPM. Con nodejs instalado y npm debe instalar globalmente los paquetes de Ionic Framework

`npm install -g ionic@3.9`

## Ejecución

Para la ejecución ejecute en la raíz del proyecto el comando `npm install`, una vez instaladas todas las dependencias ejecute entonces `ionic serve`


## Configuración interna de la aplicación.

Para que la aplicación (frontend) vea el backend es necesario configurar el host y puerto donde el mismo se ejecuta, para ello en la ruta

`src/pages/home/home.ts` 

Existe la variable en la línea 7: 

`const apiurl = "http://localhost:8082/md-api/";`

Colocar en la misma la URL al backend.

## Producción

Para poner en producción el sistema coloque la carpeta www en un servidor de aplicaciones web como apache/nginx.





