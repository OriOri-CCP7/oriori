from django.db import models
# from django.contrib.gis.db import models
# Create your models here.

class Location(models.Model):
    country = models.CharField(max_length=255)
    prefecture = models.CharField(max_length=255)

class Store(models.Model):
    name = models.CharField(max_length=255)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    # coordinates = models.PointField(srid=4326) # ID for goggle 4326 PointField(srid=4326)


class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    uuid = models.CharField(max_length=255, unique=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)


class Product(models.Model):
    product_name = models.CharField(max_length=255)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    sources = models.CharField(max_length=255, null=True)


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

