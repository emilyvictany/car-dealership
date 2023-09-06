# CarCar

Team:

* Brian La - Service
* Emily Yim - Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

Purpose of this microservice is to keep track of service appointments for automobiles and their owners.

3 Models:
Technician:
AutomobileVO: will poll the 'vin' and 'sold' fields from Automobile model in inventory and will be used for the special feature.
Appointment:

Special Feature:
If the VIN in the appointment matches a VIN from the AutomobileVO, then it means that it was sold through us and are considered a VIP.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
