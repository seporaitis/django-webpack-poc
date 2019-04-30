# django-webpack-poc

A simple proof-of-concept project integrating `webpack` into a "pre-existing" Django project. 

The purpose is to avoid complexity and concentrate on the basics:

1. (re)generate static resources fast enough on development machine;
2. static resources do not require node/npm on production;
3. change existing Django setup as little as possible (e.g. use `whitenoise` to serve static resources).

Requirements:
1. Node, npm and npx are installed.
2. Python 3.6+

Setup:

1. `pip install -r requirements.txt`
2. `(cd django_webpack_poc/homepage/static_source; npm install)`
3. `python manage.py migrate`

Run development version:

```
python manage.py runserver 0:8000
```

Run "production" version:

```
PRODUCTION=1 python manage.py runserver 0:8000
```
