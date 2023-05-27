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


# class Movie(models.Model):
#     title = models.CharField(max_length=255)
#     production_year = models.PositiveIntegerField()
#     director = models.CharField(max_length=255)
#     leading_actor = models.CharField(max_length=255)
#     day_of_view = models.DateField()
#     review_score = models.PositiveIntegerField(choices=SCORE_CHOICES)
#     streaming_site = models.URLField(max_length=200, null=False, blank=True)

# from django.db import models

# class Album(models.Model):
#     name = models.CharField(max_length=255)
#     artist = models.CharField(max_length=255)
#     artist_link = models.ForeignKey('Artist', null=True)

# class Artist(models.Model):
#     name = models.CharField(max_length=255)