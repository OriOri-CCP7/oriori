#!/usr/bin/env sh
cd client
npm run build
cd ..
python manage.py collectstatic --noinput
waitress-serve config.wsgi:application