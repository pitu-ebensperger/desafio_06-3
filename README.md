# Desafío 4 - Like Me (Parte II)
Curso Backend con Node y Express (G90) - 3 Acceso a base de datos con Node (Parte II)


### Descripción
1. Agregar ruta PUT en una API REST y usarla para editar data en tabla alojada en PostgreSQL.

2. Agregar ruta DELETE en una API REST y usarla para eliminar registros en tabla alojada en PostgreSQL.

3. Usar el paquete pg para conectarse e interactuar con la base de datos. 

4. Capturar posibles errores en consulta SQL con el paquete pg usando try/catch.



------


# Desafío 3 - Like Me (Parte I)
Curso Backend con Node y Express (G90) - 3 Acceso a base de datos con Node (Parte I)


### Descripción
Crear Like Me, aplicación React con consultas HTTP a un servidor local en el puerto 3000 con las rutas correspondientes al desafío en sus diferentes interacciones.

1. Crear base de datos *likeme* y una tabla posts en PostgreSQL:
- CREATE DATABASE likeme;
- CREATE TABLE posts (id SERIAL, titulo VARCHAR(25), img VARCHAR(1000), descripcion VARCHAR(255), likes INT);

2. Habilitar los cors en el servidor utilizando el paquete de npm. 

3. Usar el paquete pg para conectarse e interactuar con la base de datos. 

4. Crear una ruta GET con Express para devolver los registros de una tabla alojada en PostgreSQL. 

5. Crear una ruta POST con Express que reciba y almacene en PostgreSQL un nuevo registro. 




