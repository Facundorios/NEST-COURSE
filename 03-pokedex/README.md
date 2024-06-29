<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio:
2. El la temrinal ejecutar:

```
npm install
```

3. tener NEST CLI en el ordenador, en caso de no tenerlo, ejecutar:

```
npm i -g @nestjs/cli
```

4. Levantar la base de dato mediante docker.
```
docker-compose up -d
```

5. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```


6. Cargar las variables de valor de las variables de entornos en el ```.env```


7. Inicializar la aplicación en modo desarrollo.
```
npm run start:dev
```

8. Cargar la seed. Una "seed" (semilla) se refiere a datos iniciales que se cargan en la base de datos al momento de su inicialización. Realice una petición "get" a la siguiente url.

```
http://localhost:3000/api/v2/seed
```

# Stack utilizado
* NestJS
* MongoDB 