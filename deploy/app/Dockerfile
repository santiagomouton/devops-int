FROM python:3.6.15-buster as compiler                                                                                                
                                                                                                        
RUN apt-get update && \apt-get -y install \
    gcc \
    libpq-dev \
    python-dev \
    graphviz \
    libgraphviz-dev
                                                                                                        
COPY requirements.txt /requirements.txt
RUN python -m pip install -U --force-reinstall pip
RUN pip install -r /requirements.txt                                                     

FROM python:3.6.15-alpine
COPY --from=compiler /usr/local/lib/python3.6/site-packages/ /usr/local/lib/python3.6/site-packages/
COPY --from=compiler /usr/local/bin/ /usr/bin/                                                                                                                                                                                                                 
COPY . /code                                                                                                         
WORKDIR /code
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH /code:$PYTHONPATH
ENV SECRET_KEY="hola"
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000"]