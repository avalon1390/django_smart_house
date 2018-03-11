# Generated by Django 2.0 on 2018-03-07 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_model', '0002_auto_20170710_0944'),
    ]

    operations = [
        migrations.CreateModel(
            name='Indication_stream',
            fields=[
                ('device', models.CharField(default='', max_length=30)),
                ('indication', models.IntegerField()),
                ('arrival_time', models.DateTimeField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.RemoveField(
            model_name='devices',
            name='login',
        ),
        migrations.RemoveField(
            model_name='devices',
            name='type',
        ),
        migrations.RemoveField(
            model_name='indication',
            name='serial',
        ),
        migrations.AddField(
            model_name='indication',
            name='device',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AlterField(
            model_name='device_spec',
            name='data_format',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='device_spec',
            name='data_modificator',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.DeleteModel(
            name='Devices',
        ),
        migrations.DeleteModel(
            name='Users',
        ),
    ]