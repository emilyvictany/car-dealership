from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO
# Create your views here.

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id"
    ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "statis",
        "vin",
        "technician"
    ]
    encoders = {"technician" : TechnicianEncoder()}

@require_http_methods(["GET", "POST", "DELETE"])
def api_technicians(request, technician_id=None):
    if technician_id == None:
        if request.method == "GET":
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians" : technicians},
                encoder = TechnicianEncoder
            )
        else:
            content = json.loads(request.body)
            print("THIS IS THE CONTENT: ", content)
            try:
                technician = Technician.objects.create(**content)
                return JsonResponse(
                    technician,
                    encoder = TechnicianEncoder,
                    safe=False
                )
            except:
                return JsonResponse(
                    {"message": "Could not create technician"},
                    status=400
                )
    else:
        if request.method == "DELETE":
            count, _ = Technician.objects.filter(employee_id=technician_id).delete()
            return JsonResponse({"deleted": count > 0})
