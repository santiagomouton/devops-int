FROM nginx:alpine
# copio el index.html personalizado
ADD index.html .
# concateno el index personalizado con el por defecto de nginx
RUN cat index.html >> /var/share/nginx/html/index.html