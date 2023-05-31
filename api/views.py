from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import User
from base.models import Favorite
from base.models import Location
from base.models import Store
from base.models import Product
from base.serializers import UserSerializer
from base.serializers import FavoriteSerializer
from base.serializers import LocationSerializer
from base.serializers import StoreSerializer
from base.serializers import ProductSerializer

# Create your views here.

@api_view(['GET'])
def hello(request):
   return Response('Hello World 🌎')

# Views for User data
@api_view(['GET'])
def getUserData(request):
  query_parameter = request.query_params.get('username')
  user = User.objects.get(username=query_parameter)
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)

@api_view(['POST'])
def addNewUser(request):
  serializer = UserSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

@api_view(['PATCH'])
def editUserData(request, uuid):
  user = User.objects.get(uuid = uuid)
  user.username = request.data.get('username', user.username)
  user.email = request.data.get('email', user.email)
  user.location_id = request.data.get('location_id', user.location_id)
  user.save()
  return Response(user)

# Views for Favorites data
@api_view(['GET'])
def getUserFavorites(request):
  favorites = Favorite.objects.select_related('users_set')
  serializer = FavoriteSerializer(favorites, many=True)
  return Response(serializer.data)

@api_view(['POST'])
def addNewFavorite(request):
  serializer = FavoriteSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

@api_view(['DELETE'])
def removeFavorite(request, pk):
  favorite = Favorite.objects.get(pk=pk)
  favorite.delete()
  return Response("Favorite Deleted")

# Views for Product data
@api_view(['GET'])
def getProductData(request):
  query_parameter = request.query_params.get('name')
  product = Product.objects.get(product_name=query_parameter)
  serializer = ProductSerializer(product)
  return Response(serializer)

@api_view(['POST'])
def addNewProduct(request):
  serializer = ProductSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

@api_view(['PATCH'])
def editProductData(request, name):
  product = Product.objects.get(product_name=name)
  product.product_name = request.data.get('product_name', product.product_name)
  product.store_id = request.data.get('store_id', product.store_id)
  product.start_date = request.data.get('start_date', product.start_date)
  product.end_date = request.data.get('end_date', product.end_date)
  product.sources = request.data.get('sources', product.sources)
  product.save()
  return Response(product)

@api_view(['DELETE'])
def deleteProductData(request, name):
  product = Product.objects.get(product_name=name)
  product.delete()
  return Response("Product Deleted")

# Views for Store data
@api_view(['GET'])
def getStoreData(request):
  query_parameter = request.query_params.get('name')
  store = Store.objects.get(name=query_parameter)
  serializer = StoreSerializer(store)
  return Response(serializer)

@api_view(['POST'])
def addNewStore(request):
  serializer = StoreSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

@api_view(['PATCH'])
def editStoreData(request, name):
  store = Store.objects.get(name=name)
  store.name = request.data.get('name', store.name)
  store.location_id = request.data.get('location_id', store.location_id)
  store.coordinates = request.data.get('coordinates', store.coordinates)
  store.save()
  return Response(store)

@api_view(['DELETE'])
def deleteStoreData(request, name):
  store = Store.objects.get(name=name)
  store.delete()
  return Response("Store Deleted")