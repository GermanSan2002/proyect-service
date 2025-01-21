# Utiliza una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Compila el proyecto TypeScript
RUN npm run build

# Exposición del puerto en el contenedor
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]
