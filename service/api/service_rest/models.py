from django.db import models

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200, unique=True)

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200, unique=True)
    sold = models.BooleanField()

class Appointment(models.Model):
    date_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=15)
    vin = models.CharField(max_length=200) #this VIN isn't unique because the person has to type it in, so if they make multiple appointments, then this VIN might be re-used
    technician = models.ForeignKey(
        Technician,
        related_name = "appointment",
        on_delete=models.CASCADE
    )
