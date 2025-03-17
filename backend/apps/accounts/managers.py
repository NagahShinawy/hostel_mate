from django.db import models


class PersonManager(models.Manager):
    def filter_by_name(self, name):
        return self.filter(name__icontains=name)

    def filter_by_city(self, city):
        return self.filter(city__icontains=city)

    def filter_by_age_range(self, min_age, max_age):
        return self.filter(age__gte=min_age, age__lte=max_age)