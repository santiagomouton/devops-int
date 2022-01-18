# Arquitectura para aplicacion en AWS

A continuacion una descripcion punto por punto de los componentes:

![alt arquitecturaParaAplicacion](https://github.com/santiagomouton/devops-int/blob/prueba1/ArquitecturaAplicacion.png)

1.  Route 53 es el servicio dns que provee Amazon, con esto podran acceder desde internet con un nombre de dominio.
2.  WAF, un firewall para proteger la aplicacion de ataques que pongan en riesgo la seguridad o disponibilidad.
3.  Nube virtual privada, nuestra aplicacion debe ubicarse en una red privada para armar la infraestructura.
4.  Zonas de disponibilidad, amazon dispone de regiones en diferentes partes del mundo (Europa, Asia, America...), y estas regiones tienen sus zonas de disponibilidad, edificios separados kms entre si. Entonces, tener disponible nuestro sitio web en  mas de un edificio asegura una alta disponibilidad porque evitamos un unico punto de ruptura y nos provee escalabilidad por si se agota los recursos en un data center.
5.  Componente de ELB, Balanceador de cargas. ES un reverse proxy que se arma con nginx o algun otro servidor http que lo soporte. Con esto las peticiones se redirigen a los nodos de forma uniforme con el objetivo de evitar la sobrecarga de tareas en una unica maquina. EL criterio para la redireccion puede ser en base a metricas o un Round Robin, la eleccion depende mucho de la aplicacion porque si hay peticiones que requieren mucho procesamiento en comparacion a otras puede que se sobresature una maquina eligiendo el criterio round robin; se puede solucionar con calculo de metricas pero para eso el load balancer deberia conocer el estado de cada nodo.  
Agregar que comenzado la interccion del usuario, las peticiones siempre deben dirigirse al mismo server para evitar inconcistencia de datos, porque sino tendriamos que tener una memoria compartida de escritura y lectura (poco practico). Por eso se tiene cookies con algun identificador de server con el que el balanceador de cargas tiene en cuenta para redirigir.
6.  Las EC2 son el servicio de maquinas virtuales de amazon, son los nodos que correran los contenedores de nuestra aplicacion y servidor web frontend y backend.
7.  El auto scaling de EC2s permite la alta disponibilidad en caso de que todas las maquinas se encuentren saturadas de tareas. Levanta nuevas maquinas si se supera un limite de recursos y en caso contrario las apaga. ES uno de los componentes que garantizan al usuario la alta disponibilidad.   
8.  S3, un almacenamiento para guardar los archivos estaticos, como imagenes o videos.
9.  ElasticCache es una memoria muy rapida que nos guardara las peticiones mas frecuentes de la bdd. Disminuye los tiempos de lectura. 
10. RDS es un servicio que ofrece escalabilidad horizontal para lectura de bases de datos relacionales. 
<p><img src="https://d2908q01vomqb2.cloudfront.net/4d134bc072212ace2df385dae143139da74ec0ef/2021/08/24/Escalando-vertical-y-horizontalmente-su-instancia-Amazon-RDS-1.png" width="250"/> </p>
La bdd esclavo es una replica del master en caso de que ocurra algo en la zona A; por supuesto en cada zona tambien hay RAID. Para garantizar consistencia de datos la bdd esclavo solo puede leida.

11. Uso de DynamoDB para base de dato no relacional. TIene muchas caracteristicas, como la alta disponibilidad, escalabilidad y optimizacion. La forma en que replica para tener una alta disponibilidad es mas complejo para explicar pero tambien sigue los metodos basicos como tener instancias en las zonas de disponibilidad.