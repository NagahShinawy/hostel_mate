# Generated by Django 5.1.7 on 2025-03-17 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0004_alter_person_phone"),
    ]

    operations = [
        migrations.AlterField(
            model_name="person",
            name="age",
            field=models.PositiveSmallIntegerField(),
        ),
    ]
