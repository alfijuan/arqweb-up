# Arquitectura web - Universidad de Palermo
En este repositorio se encuentra el trabajo practico de Arquitectura Web de la Univerisdad de Palermo

## Tema
Como tema, se eligio la realizacion de una app de cursos.

## Tecnologias
Node, Express, Mongo y React

## Restful API
#### Usuarios
| HTTP          |  Ruta                          | Descripción                                                                      |
| ------------- |--------------------------------| ---------------------------------------------------------------------------------|
| `GET`         | `/users`                       | Obtener listado de usuarios                                                      |
| `GET`         | `/users/{userId}`              | Obtener datos de un usuario                                                      |
| `POST`        | `/users`                       | Crear un usuario                                                                 |
| `PUT`         | `/users/{userId}`              | Modificar datos de un usuario                                                    |
| `DELETE`      | `/users/{userId}`              | Eliminar un usuario                                                              |

#### Cursos + Clases
| HTTP          |  Ruta                          | Descripción                                                                      |
| ------------- |--------------------------------| ---------------------------------------------------------------------------------|
| `GET`         | `/courses`                     | Obtener listado de cursos                                                        |
| `GET`         | `/courses/{courseId}`          | Obtener datos de un curso                                                        |
| `POST`        | `/courses`                     | Crear un curso                                                                   |
| `POST`        | `/courses/{courseId}/lessons`  | Crear una clase y la asocia a un curso                                           |
| `PUT`         | `/courses/{courseId}`          | Modificar datos de un curso                                                      |
| `PUT`         | `/lessons/{lessonId}`          | Modificar datos de una clase                                                     |
| `DELETE`      | `/courses/{courseId}`          | Eliminar un curso                                                                |
| `DELETE`      | `/lessons/{lessonId}`          | Eliminar una clase                                                               |

#### Categorias
| HTTP          |  Ruta                          | Descripción                                                                      |
| ------------- |--------------------------------| ---------------------------------------------------------------------------------|
| `GET`         | `/categories`                  | Obtener listado de categorias                                                    |
| `GET`         | `/categories/{categoryId}`     | Obtener datos de una categoria                                                   |
| `POST`        | `/categories`                  | Crear una categoria                                                              |
| `PUT`         | `/categories/{categoryId}`     | Modificar datos de una categoria                                                 |
| `DELETE`      | `/categories/{categoryId}`     | Eliminar una categoria                                                           |