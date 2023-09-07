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
Technician: first name, last name, and employee id
AutomobileVO: will poll the 'vin' and 'sold' fields from Automobile model in inventory and will be used for the special feature.
Appointment: Keeps track of date/time, reason, status, vin, customer name, technician (selected from technician model), and will gather extra data to compare if the customer's vin matches a vin from the automobileVO so that we know if they are a VIP.

Special Feature:
If the VIN in the appointment matches a VIN from the AutomobileVO, then it means that it was sold through us and are considered a VIP.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
