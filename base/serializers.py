from rest_framework import serializers
from .models import User, Location, Store, Product, Favorite, Review


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

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
          model = Favorite
          fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
          model = Review
          fields = '__all__'