from django.db import models
from django.core.validators import RegexValidator

class TimestampedModelMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class PhoneField(models.CharField):
    """
    Custom phone number field with validation.
    Supports an optional '+' followed by 9-15 digits.
    """
    default_validators = [
        RegexValidator(
            regex=r'^\+?1?\d{9,15}$',
            message="Phone number must be in the format: '+123456789' or '123456789'. Up to 15 digits allowed."
        )
    ]

    def __init__(self, *args, **kwargs):
        kwargs.setdefault('max_length', 15)  # Set default max length
        super().__init__(*args, **kwargs)
