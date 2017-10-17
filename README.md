# Сервер умный дом

#### Серверная часть

### Django

| Инструмент | Описание установки |
| ------ | ------ |
| Django| [djbook.ru/ch02s02.html] [PlDb] |
| Channels  | [channels.readthedocs.io/en/stable/installation.html] [PlGh]|

| Дополнительный библиотки Python |
| ------ |
|random|
|datetime|
|time|

## Структура приложения
.
├── db_model
│   ├── migrations
├── smart_house
│   ├── static
│   │   └── js
│   ├── templates
└── socket_dj
│   ├── migrations

# Создание проекта
После установки Django и Channels(реализует соккеты) создадим новый проект командой в консоли
```sh
$ django-admin.py startproject smart_house
```
Автоматически сгенерируются все базовые файлы приложения
Далее перейдём в созданный проект "smart_house" и сгенерируем каталоги под-приложений
```sh
$ manage.py startapp db_model
$ manage.py startapp socket_dj
```

### Созданиеи заполнение тестовыми данными таблиц в базе
В файле db_model/models.py описана база данных, для генерации таблиц в базе выполним комманды:
```sh
$ python3 manage.py makemigrations
$ python3 manage.py migrate
```
Мы создали миграцию и выполнили её базируясь на настройках подключения к базе из smart_house/settings.py
>DATABASES = {
>  'default': {
>    'ENGINE': 'django.db.backends.postgresql_psycopg2',
>    'NAME': 'django_db',
>    'USER' : 'user_name',
>    'PASSWORD' : 'password',
>    'HOST' : '127.0.0.1',
>    'PORT' : '5432',
>  }
>}

Для заполнения тестовыми данными выполнис SQL скрипт:
>﻿INSERT INTO Logins (login, password) VALUES
>('Max', '321'),
>('Vlad', '123'),
>('Lex', '132');
>
>
>INSERT INTO Device_spec (type, data_format, data_modificator) VALUES
>('temperature_dht600', 'celesium', '1'),
>('light_dht600', 'lumen', '1'),
>('air_humidity_dht600', '%', '1'),
>('light_dht11', 'lumen', '100'),
>('temperature_dht11', 'celesium', '100');
>
>INSERT INTO Devices (serial, password, login, type) VALUES
>('1', '1111','Vlad', 'temperature_dht600'),
>('2', '2222','Vlad', 'light_dht600'),
>('3', '3333','Vlad', 'air_humidity_dht600'),
>('4', '4444','Max', 'temperature_dht600'),
>('5', '5555','Max', 'light_dht11'),
>('6', '6666','Max', 'air_humidity_dht600'),
>('7', '7777','Max', 'temperature_dht11'),
>('8', '8888','Lex', 'temperature_dht11');

### Запуск приложения
Перед запуском удостовериться в налачии разрешеного хоста в smart_house/settings.py:
>ALLOWED_HOSTS = ["127.0.0.3"]

Запустить коммандой:
```sh
$ sudo python3 manage.py runserver 127.0.0.3:8000
```
Перейти в браузер

### Основные файлы и их назначение
db_model/models.py - модели базы данных для миграции и запросов к базе данных
smart_house/device.py - основные функции псевдо запроса данных с сенсоров, обработка данных и запись показаний сенсоров в базу
smart_house/routing.py - маршрутизация каналов socket_io
smart_house/sensorsProcessing.py - обработка псевдоданных с сенсоров
smart_house/settings.py - настройки проекта Django
smart_house/urls.py - допустимые HTTP запросы
smart_house/views.py - обработчик HTTP запросов
smart_house/wsgi.py - надстройка wsgi
socket_dj/consumers.py - обработчик и возбудитель сообщений в socket_io к клиенту

smart_house/static/js/app.js кнопка выхода(reackt + redux)
smart_house/static/js/index.js - страница отображения данных с сенсоров (reackt + redux)
smart_house/static/js/login.js - стартовая страница логина (обычные eventEmitter и XMLHttpRequest - без reackt + redux для контраста)
smart_house/static/js/main.1caba562.js - файл сгенерированный webpack из app.js и index.js
