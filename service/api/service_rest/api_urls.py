from django.urls import path
from .views import api_technicians, api_appointments, api_appointment

urlpatterns = [
    path("technicians/", api_technicians, name="list_technicians"),
    path("technicians/<str:technician_id>/", api_technicians ,name="delete_technicians"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:appointment_id>/", api_appointment, name="api_appointment"),
    path("appointments/<int:appointment_id>/cancel/", api_appointment, name="api_appointment"),
    path("appointments/<int:appointment_id>/finish/", api_appointment, name="api_appointment")
]
