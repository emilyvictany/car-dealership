# CarCar

Team:

* Brian La - Service
* Emily Yim - Sales

## Design

Please refer to file:
*  ./DiagramProjectBeta_excalidraw

If image is not available. Then you can use the following link:
* https://excalidraw.com/#json=eeKFw_zk_XcMKUyfSyJzc,FFBT6y7VUNqMhXJf1CQvsA

## Service microservice

Explain your models and integration with the inventory
microservice, here.

Purpose of this microservice is to keep track of service appointments for automobiles and their owners.

3 Models:
* Technician: first name, last name, and employee id
* AutomobileVO: will poll the 'vin' and 'sold' fields from Automobile model in inventory and will be used for the special feature.
* Appointment: Keeps track of date/time, reason, status, vin, customer name, technician (selected from technician model), and will gather extra data to compare if the customer's vin matches a vin from the automobileVO so that we know if they are a VIP.

Special Feature:
* If the VIN in the appointment matches a VIN from the AutomobileVO, then it means that it was sold through us and are considered a VIP.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.


## Getting setup

* Fork from repository at https://gitlab.com/bmlx23/project-beta
* Setup gitlab if you need to add members
* Clone the git to your local computer
* Run the following commands on your computer
    * docker volume create beta-data
    * docker-compose build
    * docker-compose up

## Inventory Monolith CRUD
* Build a CRUD for the Inventory Monolith
* From Insomnia and your browser, you can access the manufacturer endpoints at the following URLs.
CRUD will be listed in the following structure:

### Manufacturers CRUD:
| Action | Method | URL
| ----------- | ----------- | -----------|
| List manufacturers | GET | http://localhost:8100/api/manufacturers/
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/:id/
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/:id/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/:id/

#### Creating or updating manufacturer example:
``````
{ "name": "Chrysler" }
``````

### Vehicle models CRUD:
| Action | Method | URL
| ----------- | ----------- | -----------|
|List vehicle models|GET|http://localhost:8100/api/models/
|Create a vehicle model|POST|http://localhost:8100/api/models/
|Get a specific vehicle model|GET|http://localhost:8100/api/models/:id/
|Update a specific vehicle model|PUT|http://localhost:8100/api/models/:id/
|Delete a specific vehicle model|DELETE|http://localhost:8100/api/models/:id/

#### Create a vehicle model example:
``````
{
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer_id": 1
}
``````
#### Update a vehicle model example:
``````
{
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
``````
#### Automobile information CRUD:
| Action | Method | URL
| ----------- | ----------- | -----------|
|List automobiles|GET|http://localhost:8100/api/automobiles/
|Create an automobile|POST|http://localhost:8100/api/automobiles/
|Get a specific automobile|GET|http://localhost:8100/api/automobiles/:vin/
|Update a specific automobile|PUT|http://localhost:8100/api/automobiles/:vin/
|Delete a specific automobile|DELETE|http://localhost:8100/api/automobiles/:vin/

#### Create an automobile example:
``````
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
``````
#### Update an automobile example:
``````
{
  "color": "red",
  "year": 2012,
  "sold": true
}
``````
## Service Microservice CRUD:
Build a CRUD for the Service Microservice using the following URLs.
| Action | Method | URL
| ----------- | ----------- | -----------|
|List technicians|GET|http://localhost:8080/api/technicians/
|Create a technician|POST|http://localhost:8080/api/technicians/
|Delete a specific technician|DELETE|http://localhost:8080/api/technicians/:id/
|List appointments|GET|http://localhost:8080/api/appointments/
|Create an appointment|POST|http://localhost:8080/api/appointments/
|Delete an appointment|DELETE|http://localhost:8080/api/appointments/:id/
|Set appointment status to "canceled"|PUT|http://localhost:8080/api/appointments/:id/cancel/
|Set appointment status to "finished"|PUT|http://localhost:8080/api/appointments/:id/finish/
|AutomobileVO List (for poll testing)|GET|http://localhost:8080/api/automobilesVO/

#### Create Appointment Example:
``````
{
	"date_time" : "2023-7-28 10:30",
	"reason" : "full repair",
	"status" : "created",
	"vin" : "QWEASD123",
	"customer": "Mike Ike",
	"technician" : "ffelix"
}
``````
#### Update to Cancel Appointment Example:
```
{ "status" : "canceled" }
```
#### Update to Finish Appointment Example:
``````
{ "status" : "finished" }
``````
#### Create a Technician Example:
``````
{
	"first_name" : "Fixit",
	"last_name" : "Felix",
	"employee_id" : "ffelix"
}
``````
