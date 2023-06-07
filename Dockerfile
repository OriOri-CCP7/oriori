FROM node:20.2.0 AS clientbuilder
WORKDIR /client
COPY /client /client
RUN npm ci && \
    npm run build

FROM python:3.11-slim-buster
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN mkdir -p /code
WORKDIR /code
COPY requirements.txt /tmp/requirements.txt
RUN set -ex && \
    pip install --upgrade pip && \
    pip install -r /tmp/requirements.txt && \
    rm -rf /root/.cache/
COPY . /code
COPY --from=clientbuilder . /code

EXPOSE 8000
CMD ["sh", "runserver.sh"]
