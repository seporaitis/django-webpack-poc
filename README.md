# django-webpack-poc

Assumptions:
1. You have node, npm and npx installed.
2. You are in python virtualenv.

```
$ pip install -r requirements.txt
$ (cd django_webpack_poc/homepage/static_source; npm install)
$ python manage.py migrate
$ python manage.py runserver 0:8000
```
