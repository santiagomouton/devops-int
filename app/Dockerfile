FROM python:3.6.15-slim-buster                                                                                               

# para indicar que las salidas se impriman directamente y no guarde en un buffer                                                                                                        
ENV PYTHONUNBUFFERED 1
# instalo las herramientas necesarias para compilar las dependencias
RUN apt-get update && \
    apt-get -y install \
    gcc \
    libpq-dev \
    python3-dev \
    libgraphviz-dev \
    # ahorro espacio borrando la lista de los repositorios
    && rm -rf /var/lib/apt/list/*

WORKDIR /usr/src/app

COPY ./requeriments.txt .
RUN pip install -r requirements.txt --no-cache-dir

# Se copia el codigo al final de todo para no volver a instalar todo en caso de que se haya modificado el codigo
COPY . .