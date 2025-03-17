from django.db import models
from .managers import PersonManager
from backend.apps.core.db.mixins import TimestampedModelMixin, PhoneField


class Person(TimestampedModelMixin, models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveSmallIntegerField()
    city = models.CharField(max_length=100)
    email = models.EmailField()
    phone = PhoneField(unique=True)  # Use the custom field

    objects = PersonManager()

    def __str__(self):
        return f"{self.__class__.__name__}(id={self.pk}, title={self.name})"
