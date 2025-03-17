from django.contrib import admin
from .models import Person


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ("name", "age", "city", "email", "phone", "created_at", "updated_at")
    search_fields = ("name", "email", "city")
    list_filter = ("city", "age")

    fieldsets = (
        ("Basic Information", {"fields": ("name", "age")}),
        ("Contact Information", {"fields": ("email", "phone")}),
        ("Location", {"fields": ("city",)}),
    )
