from rest_framework import serializers
from .models import User, Location, Store, Product, Bookmark, Log

class UserSerializer(serializers.ModelSerializer):
    class Meta:
          model = User
          fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
          model = Location
          fields = '__all__'

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
          model = Store
          fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
          model = Product
          fields = '__all__'

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
          model = Bookmark
          fields = '__all__'

class LogSerializer(serializers.ModelSerializer):
    class Meta:
          model = Log
          fields = '__all__'