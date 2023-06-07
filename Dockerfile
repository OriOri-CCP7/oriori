FROM node:20.2-alpine3.17 AS clientbuilder
WORKDIR /client
COPY /client /client
RUN --mount=type=secret,id=REACT_APP_API_KEY \
    --mount=type=secret,id=REACT_APP_FB_AUTH_DOMAIN \
    --mount=type=secret,id=REACT_APP_FB_PROJECT_ID \
    --mount=type=secret,id=REACT_APP_FB_STORAGE_BUCKET \
    --mount=type=secret,id=REACT_APP_FB_MESSAGING_SENDER_ID \
    --mount=type=secret,id=REACT_APP_FB_APP_ID \
    REACT_APP_API_KEY="$(cat /run/secrets/REACT_APP_API_KEY)" \
    REACT_APP_FB_AUTH_DOMAIN="$(cat /run/secrets/REACT_APP_FB_AUTH_DOMAIN)" \
    REACT_APP_FB_PROJECT_ID="$(cat /run/secrets/REACT_APP_FB_PROJECT_ID)" \
    REACT_APP_FB_STORAGE_BUCKET="$(cat /run/secrets/REACT_APP_FB_STORAGE_BUCKET)" \
    REACT_APP_FB_MESSAGING_SENDER_ID="$(cat /run/secrets/REACT_APP_FB_MESSAGING_SENDER_ID)" \
    REACT_APP_FB_APP_ID="$(cat /run/secrets/REACT_APP_FB_APP_ID)" \
    npm ci && \
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
