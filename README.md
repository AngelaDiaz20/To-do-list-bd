# To-do-list-bd - Base de datos de MongoDB

<p align="left"> 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> 
<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> 
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> 
<a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> 
</p>

## index.js
```javascript
const express = require("express");
```
importación de librería de Express.js, un marco de Node.js para el desarrollo de aplicaciones web y API. Express proporciona una interfaz fácil de usar para crear rutas y manejar solicitudes HTTP.

```javascript
const mongoose = require("mongoose");
```
Importación de librería de Mongoose, la cual está dedicada al modelado de objetos de MongoDB para Node.js. Permite definir esquemas para los documentos en las colecciones de MongoDB, así como realizar operaciones CRUD en ellos de manera fácil.

```javascript
const cors = require("cors");
```
Importación de librería de CORS el cual puede permitit a un servidor que una aplicación de otro origen acceda a sus recursos.
 
## Configuración del servidor

Configuración del servidor usando el marco de trabajo Express.js.
```javascript
const PORT = 3030;
const app = express();
```
`const PORT = 3030;` establece una constante llamada "PORT" con el valor de 3030. Esta variable se usa para especificar el número de puerto en el que el servidor escuchará.

`const app = express();` crea una nueva instancia de la aplicación Express, que se asigna a la constante "app". Esta instancia se utiliza para configurar y manejar las solicitudes y respuestas del servidor.

```javascript
const todoRoutes = require("./routes/todoRoutes");

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
```
`const todoRoutes` está importando un archivo de rutas específico para la aplicación. 
`const connectionOptions` crea un objeto de opciones de conexión con la base de datos, la cual incluye dos opciones necesarias para garantizar una conexión segura y compatible con la versión actual de MongoDB. `useUnifiedTopology: true` que habilita el nuevo esquema de topología en MongoD, es decir, a la estructura lógica de una base de datos, y, `useNewUrlParser: true` que habilita el nuevo analizador de URL en MongoDB, el cual es responsable de interpretar la cadena de conexión usada para conectarse a la base de datos

```javascript
mongoose
  .connect("mongodb://127.0.0.1/todolist", connectionOptions)
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.error(err));
```
El método `connect()` de Mongoose devuelve una promesa, y en este caso, se están utilizando las funciones `.then()` y `.catch()` para manejar el resultado de la promesa.

Si la conexión es exitosa, se ejecutará console.log("Connected successfully"), imprimiendo un mensaje en la consola indicando que se ha conectado con éxito. Si ocurre un error, se ejecutará console.error(err), imprimiendo el error en la consola.

```javascript
app.listen(PORT, () => {
  console.log("The server is listening on port " + PORT);
});
```
Se utiliza el método `listen()` de Express para iniciar el servidor en el puerto especificado en la constante `PORT`

## Todo.js
```javascript
const TodoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});
```
Inicialmente se guardo en una constante 'TodoShema' para guardar o definir dos campos `title` de tipo 'string' y `completed` de tipo 'booleano'
```javascript
mongoose.set('strictQuery', false);
```
Indicamos a `Mongoose` que no debe aplicar restricciones estrictas a las consultas a la base de datos.
```javascript
module.exports = mongoose.model("Todo", TodoSchema);
```
Finalmente exportamos el archivo para poder ser utilizado en otro lugar del codigo.

## vercel.json

Archivo de configuración de Vercel, una plataforma de despliegue de aplicaciones web. 

```javascript
{
    "version": 2,
    "builds": [
        {
            "src": "./index.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/"
        }
    ]
}
```

`version:` Especifica la versión del archivo de configuración.

`builds:` Especifica los archivos o carpetas que se deben construir antes de desplegar la aplicación. En este ejemplo, se está especificando que el archivo index.js debe ser construido usando el "builder" (herramienta de construcción) @vercel/node.

`routes:` Especifica las rutas de la aplicación. En este caso, se está especificando que todas las solicitudes a cualquier ruta (indicado por "(.*)") deben ser redirigidas a la ruta raíz ("/").

>En resumen, este archivo de configuración está especificando que Vercel debe construir el archivo "index.js" y despues todas las rutas que lleguen a la aplicación deben ser redirigidas a la ruta raíz.
