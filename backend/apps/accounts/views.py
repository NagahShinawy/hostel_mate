from rest_framework import viewsets
from .models import Person
from .serializers import PersonSerializer


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        filter_name = self.request.query_params.get("filter", None)
        if filter_name:
            queryset = Person.objects.filter_by_name(filter_name)
        return queryset
