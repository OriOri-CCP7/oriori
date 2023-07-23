from django.db import models
# Create your models here.

class Location(models.Model):
    country = models.CharField(max_length=255)
    prefecture = models.CharField(max_length=255)

class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    uuid = models.CharField(max_length=255, unique=True)
    location = models.ForeignKey(Location, default=13, on_delete=models.SET_DEFAULT)

class Product(models.Model):
    product_name = models.CharField(max_length=255)
    location = models.ManyToManyField(Location, related_name='products', blank=False)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    img_url = models.CharField(max_length=255, null=True)
    link_url = models.CharField(max_length=255, null=True)

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'product'], name='unique_bookmark')
        ]

class Log(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    time_created = models.DateTimeField(auto_now_add=True)
    liked_it = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'product'], name='unique_log')
        ]