from rest_framework import serializers
from .models import User
from .models import Location
from .models import Store
from .models import Product
from .models import Favorite

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
