from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO
# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id"
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician"
    ]
    encoders = {"technician" : TechnicianEncoder()}

@require_http_methods(["GET"])
def api_automobileVO(request):
    if request.method == "GET":
        autos = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles" : autos},
            encoder=AutomobileVOEncoder
        )


@require_http_methods(["GET", "POST", "DELETE"])
def api_technicians(request, technician_id=None):
    if technician_id == None:
        if request.method == "GET":
            try:
                technicians = Technician.objects.all()
                return JsonResponse(
                    {"technicians" : technicians},
                    encoder = TechnicianEncoder
                )
            except:
                return JsonResponse(
                    {"message": "Could get a technician"},
                    status=400
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
# Consider seperating methods that require and don't require an ID
    else:
        if request.method == "DELETE":
            count, _ = Technician.objects.filter(employee_id=technician_id).delete()
            return JsonResponse({"deleted": count > 0})

# Create the views for the appointments
@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        try:
            appointments = Appointment.objects.all()
            return JsonResponse(
                {"appointments" : appointments},
                encoder = AppointmentEncoder
            )
        except:
                return JsonResponse(
                    {"message": "Could not get appointment"},
                    status=400
                )
    else: #POST
        try:
            content = json.loads(request.body)
            print("THIS IS THE CONTENT: ", content)
            technician = Technician.objects.get(employee_id=content["technician"])
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist. Could not create an appointment"},
                status=400
            )
        return JsonResponse(
            appointment,
            encoder = AppointmentEncoder,
            safe=False
        )

@require_http_methods(["PUT","DELETE"])
def api_appointment(request, appointment_id=None):
    if request.method == "DELETE":
            count, _ = Appointment.objects.filter(id=appointment_id).delete()
            return JsonResponse({"deleted": count > 0})
    else:
        try:
            content = json.loads(request.body)
            Appointment.objects.filter(id=appointment_id).update(**content)
            appointment = Appointment.objects.get(id=appointment_id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
                return JsonResponse(
                    {"message": "Could not update appointment"},
                    status=400
                )
