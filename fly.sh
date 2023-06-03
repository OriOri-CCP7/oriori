#!/usr/bin/env sh

python manage.py migrate --noinput
python manage.py collectstatic --noinput