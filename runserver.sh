#!/usr/bin/env sh
python3 manage.py collectstatic --noinput
waitress-serve --port=8000 --threads=2 config.wsgi:application