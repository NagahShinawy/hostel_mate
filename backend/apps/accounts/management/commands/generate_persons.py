from django.core.management.base import BaseCommand
from faker import Faker
from backend.apps.accounts.models import Person

class Command(BaseCommand):
    help = 'Generate dummy data for the Person model'
    MAX_PERSONS = 5
    def handle(self, *args, **kwargs):
        fake = Faker()


        for _ in range(self.MAX_PERSONS):
            Person.objects.create(
                name=fake.name(),
                age=fake.random_int(min=18, max=80),
                city=fake.city(),
                email=fake.email(),
                phone=fake.phone_number(),
            )

        self.stdout.write(self.style.SUCCESS(f'Successfully generated {self.MAX_PERSONS} persons.'))