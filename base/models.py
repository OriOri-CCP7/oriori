from django.db import models

# Create your models here.

class Location(models.Model):
    country = models.CharField(max_length=255, unique=True)
    prefecture = models.CharField(max_length=255)

class Store(models.Model):
    name = models.CharField(max_length=255)
    location_id = models.ForeignKey(Location)
    coordinates = models.PointField()


class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    uuid = models.CharField(max_length=255, unique=True)
    location_id = models.ForeignKey(Location)


class Product(models.Model):
    product_name = models.CharField(max_length=255)
    store_id = models.ForeignKey(Store)
    start_date = models.DateField()
    end_date = models.DateField()
    sources = models.CharField(max_length=255, null=True)


class Favorite(models.Model):
    user_id = models.ForeignKey(User)
    product_id = models.ForeignKey(Product)


"""
-change the database settings in setting.py because the default is sqlite
-make a DATABASE in postgres
"""