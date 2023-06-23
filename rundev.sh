#!/usr/bin/env sh
cd client && \
npm run build && \
cd .. && \
python3 manage.py migrate --noinput && \
python3 manage.py collectstatic --noinput && \
waitress-serve config.wsgi:application