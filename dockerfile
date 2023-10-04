# Usa una imagen base con Node.js instalado
FROM node:14

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /app

# Copia el package.json y el package-lock.json (o yarn.lock si usas Yarn)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todos los archivos de la aplicación en el contenedor
COPY . .

# Expone el puerto que Quasar utiliza para el desarrollo (por defecto: 8080)
EXPOSE 8080

# Comando para ejecutar Quasar en modo de desarrollo
CMD ["npm", "run", "dev"]