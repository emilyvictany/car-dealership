from django.shortcuts import render
from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Customer, Sale
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json


# ////////////////////////////
# //        Encoders        //
# ////////////////////////////

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number"
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "automobile",
        "salesperson",
        "customer"]

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }


# ///////////////////////////
# //         Views         //
# ///////////////////////////

@require_http_methods(["GET", "POST", "DELETE"])
def api_salesperson(request, id=None):
    if id is None:
        if request.method == "GET":  # list all salespeople
            try:
                salespeople = Salesperson.objects.all()
                return JsonResponse(
                    {"salespeople": salespeople},
                    encoder=SalespersonEncoder
                )
            except Salesperson.DoesNotExist:
                response = JsonResponse({"message": "Does not exist"})
                response.status_code = 404
                return response

        else:  # POST, create salesperson
            content = json.loads(request.body)
            try:
                salesperson = Salesperson.objects.create(**content)
                return JsonResponse(
                    salesperson,
                    encoder=SalespersonEncoder,
                    safe=False
                )
            except Salesperson.DoesNotExist:
                response = JsonResponse({"message": "Unable to create salesperson"})
                response.status_code = 400
                return response

    else:
        if request.method == "DELETE":  # delete a specific salesperson
            try:
                salesperson = Salesperson.objects.get(id=id).delete()
                return JsonResponse({"confirmation": "Salesperson deleted"})
            except Salesperson.DoesNotExist:
                return JsonResponse({"message": "Salesperson does not exist"})


@require_http_methods(["GET", "POST", "DELETE"])
def api_customer(request, id=None):
    if id is None:
        if request.method == "GET":  # list all customers
            customers = Customer.objects.all()
            return JsonResponse(
                {"customers": customers},
                encoder=CustomerEncoder
            )
        else:  # POST, create customer
            content = json.loads(request.body)
            try:
                customer = Customer.objects.create(**content)
                return JsonResponse(
                    customer,
                    encoder=CustomerEncoder,
                    safe=False
                )
            except:
                response = JsonResponse({"message": "Unable to create customer"})
                response.status_code = 400
                return response
    else:
        if request.method == "DELETE":  # delete a specific customer
            try:
                customer = Customer.objects.filter(id=id).delete()
                return JsonResponse({"confirmation": "Customer deleted"})
            except Customer.DoesNotExist:
                return JsonResponse(
                    {"message": "Customer does not exist"},
                    status=404
                )



@require_http_methods(["GET", "POST", "DELETE"])
def api_sales(request, id=None):
    if id is None:
        if request.method == "GET":  # list all sales
            sales = Sale.objects.all()
            return JsonResponse(
                {"sales": sales},
                encoder=SaleEncoder,
                safe=False
            )
        else:  # POST, create a sale
            # need automobile VIN, salesperson, customer, price
            content = json.loads(request.body)
            try:
                vin = content["automobile"]
                auto = AutomobileVO.objects.get(vin=vin)
                content["automobile"] = auto
                content["automobile"].sold = True
                content["automobile"].save()
            except AutomobileVO.DoesNotExist:
                return JsonResponse(
                    {"message": "Automobile either unavailable or does not exist"},
                    status=404
                )
            try:
                salesperson = content["salesperson"]
                new_sale = Salesperson.objects.get(employee_id=salesperson)
                content["salesperson"] = new_sale
            except Salesperson.DoesNotExist:
                return JsonResponse(
                    {"message": "Salesperson does not exist"},
                    status=404
                )
            try:
                customer_id = content["customer"]
                customer = Customer.objects.get(id=customer_id)
                content["customer"] = customer
            except Customer.DoesNotExist:
                return JsonResponse(
                    {"message": "Customer does not exist"},
                    status=404
                )
            price = content["price"]
            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
    else:
        if request.method == "DELETE":  # delete a specific sale
            try:
                sale = Sale.objects.get(id=id).delete()
                return JsonResponse({"confirmation": "Sale deleted"})
            except Sale.DoesNotExist:
                return JsonResponse({"message": "Sale does not exist"}, status=404)
