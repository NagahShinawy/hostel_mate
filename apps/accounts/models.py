from django.db import models
from .managers import PersonManager
from apps.core.db.mixins import TimestampedModelMixin


class Person(TimestampedModelMixin, models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    city = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    objects = PersonManager()

    def __str__(self):
        return f"{self.__class__.__name__}(id={self.pk}, title={self.name})"
