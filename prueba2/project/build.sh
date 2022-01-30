#!/bin/sh

cd app/frontend/
if [ "$(docker images -q app_frontend:latest)" = "" ];
then
    echo "\nImagen no encontrada: Build\n"
    docker build -t app_frontend:latest .
fi
cd ..  

echo "\nBuildeo el frontend y muevo los archivos para el loader del backend\n"
docker run --rm -ti -e NODE_ENV='production' -u node -v $PWD:/usr/src/app app_frontend:latest npm run build --prefix frontend/
mv -f assets/ webpack-stats.prod.json -t backend/

echo "\nCambio del directorio al backend\n"
cd backend/
docker build -t backend:djangoApp -f Dockerfile.prod .