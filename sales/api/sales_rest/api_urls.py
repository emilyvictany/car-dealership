from django.urls import path
from .views import api_salesperson, api_customer, api_sales

urlpatterns = [
    path("customer/", api_customer, name="create_customer"),
    path("customers/", api_customer, name="customer_list"),
    path("customers/<int:id>/", api_customer, name="delete_customer"),
    path("salesperson/", api_salesperson, name="create_salesperson"),
    path("salespeople/", api_salesperson, name="list_salespeople"),
    path("salesperson/<int:id>/", api_salesperson, name="delete_salesperson"),
    path("sales/", api_sales, name="create_sale"),
    path("sales/", api_sales, name="list_sales"),
    path("sales/<int:id>/", api_sales, name="delete_sale")
]
