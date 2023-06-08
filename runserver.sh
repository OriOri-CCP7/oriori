#!/usr/bin/env sh
python manage.py collectstatic --noinput
waitress-serve --port=8000 --threads=2 config.wsgi:application