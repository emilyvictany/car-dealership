from django.urls import path
from .views import api_salesperson, api_customer, api_sales

urlpatterns = [
    path("customer/", api_customer, name="create_customer"),
    path("customers/", api_customer, name="customer_list"),
    path("customers/<int:id>/", api_customer, name="delete_customer")
]
