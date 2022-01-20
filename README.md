# CI/CD Github actions, AWS
Para la integracion continua se usara Github actions, ECR (registro de imagenes de amazon) y el despliegue en ECS, que no es kubernetes del todo pero sirve para correr contenedores.
### ECR
Creo un repositorio nuevo donde se subiran las imagenes. EN un principio buildeo la imagen localmente y lo subo al repo de ECR; luego se mantendra actualizaciones con el workflow.
### ECS
Creo el cluster, un task y un servicio para preparar el entorno que lanzara la imagen, en un principio solo le configuro para que corra una sola instancia en un ec2.