# Сервер умный дом

#### Серверная часть

### Django

| Инструмент | Описание установки |
| ------ | ------ |
| Django| [https://djbook.ru/ch02s02.html] |
| Channels  | [https://channels.readthedocs.io/en/stable/installation.html] |

| Дополнительный библиотки Python |
| ------ |
|simplejson|
|channels|

## Структура приложения
```
db_model
   migrations
smart_house
   static
      js
   templates
socket_dj
   migrations
```

### Созданиеи заполнение тестовыми данными таблиц в базе
В файле db_model/models.py описана база данных, для генерации таблиц в базе выполним комманды:
```sh
$ python3 manage.py makemigrations
$ python3 manage.py migrate
```
Мы создали миграцию и выполнили её базируясь на настройках подключения к базе из smart_house/settings.py
```python
DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.postgresql_psycopg2',
    'NAME': 'django_db',
    'USER' : 'user_name',
    'PASSWORD' : 'password',
    'HOST' : '127.0.0.1',
    'PORT' : '5432',
  }
}
```
В базе присутствуют 2 таблицы: Indication и Indication_stream
Indication - таблица последних показаний(если оборудование уже есть в таблице, показание и время постубления только обновляются, иначе навая строка в таблице)
Indication_stream - таблица всех показаний(хранит все данные пришедшие от сенсоров, данные всегда заносятся в новые строки)


Предполагаемый формат данных в базе:
```
| indication | arrival_time | device |
| ------ | ------ | ------ |
|22/22.6|2018-03-07 19:46:03.431857+00|DataGroundTemperatureSensor|
|22.47|2018-03-07 19:46:03.431858+00|DataBME280Temp|
|21.31445|2018-03-07 19:46:03.431859+00|DataBME280Humidity|
|1023.409|2018-03-07 19:46:03.43186+00|DataBME280Pressure|
|1023/1023/730/586|2018-03-07 19:46:03.431861+00|DataGroundGygrometers|

```
### Запуск приложения
Перед запуском удостовериться в налачии разрешеного хоста в smart_house/settings.py:
>ALLOWED_HOSTS = ["127.0.0.3"]

Запустить коммандой:
```sh
$ sudo python3 manage.py runserver 127.0.0.3:8000
```
Перейти в браузер

### Основные файлы и их назначение
  - db_model/models.py - модели базы данных для миграции и запросов к базе данных
  - smart_house/routing.py - маршрутизация каналов socket_io
  - smart_house/settings.py - настройки проекта Django
  - smart_house/urls.py - допустимые HTTP запросы
  - smart_house/views.py - обработчик HTTP запросов
  - smart_house/wsgi.py - надстройка wsgi
  - socket_dj/consumers.py - обработчик и возбудитель сообщений в socket_io к клиенту

  - smart_house/static/js/main.js - файл сгенерированный webpack
