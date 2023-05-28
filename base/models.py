# from django.db import models
from django.contrib.gis.db import models
# Create your models here.

class Location(models.Model):
    country = models.CharField(max_length=255, unique=True)
    prefecture = models.CharField(max_length=255)

class Store(models.Model):
    name = models.CharField(max_length=255)
    location_id = models.ForeignKey(Location, on_delete=models.CASCADE)
    coordinates = models.PointField(srid=4326) # ID for goggle 4326 PointField(srid=4326)


class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    uuid = models.CharField(max_length=255, unique=True)
    location_id = models.ForeignKey(Location, on_delete=models.CASCADE)


class Product(models.Model):
    product_name = models.CharField(max_length=255)
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    sources = models.CharField(max_length=255, null=True)


class Favorite(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)


"""
-change the database settings in setting.py because the default is sqlite
-make a DATABASE in postgres
"""