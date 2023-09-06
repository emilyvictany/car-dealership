from django.urls import path
from .views import api_technicians

urlpatterns = [
    path("technicians/", api_technicians, name="list_technicians"),
    path("technicians/<str:technician_id>/", api_technicians ,name="delete_technicians")
]
