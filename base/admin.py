from django.contrib import admin
from .models import Location, Store, User, Product, Favorite

# Register your models here.
admin.site.register(Location)
admin.site.register(Store)
admin.site.register(User)
admin.site.register(Product)
admin.site.register(Favorite)