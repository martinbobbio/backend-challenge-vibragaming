# Usar una imagen base de Node.js 16
FROM node:16

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]