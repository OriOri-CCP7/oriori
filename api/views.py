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
def getAllUsers(request):
  user = User.objects.all()
  serializer = UserSerializer(user, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def getUserData(request, uuid):
  try: 
    user = User.objects.get(uuid=uuid)
    serializer = UserSerializer(user)
    return Response(serializer.data)
  except:
    return Response(serializer.errors)

@api_view(['POST'])
def addNewUser(request):
  serializer = UserSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  else: 
    return Response(serializer.errors)

@api_view(['PATCH'])
def editUserData(request, uuid):
  try:
    user = User.objects.get(uuid=uuid)
    user.username = request.data.get('username', user.username)
    user.email = request.data.get('email', user.email)
    prefecture = request.data.get('prefecture')
    if prefecture:
      location = Location.objects.get(prefecture=prefecture)
      user.location_id = location.id
    user.save()
    serializer = UserSerializer(user)
    return Response(serializer.data)
  except Exception as e:
    return Response({'error': str(e)})

@api_view(['DELETE'])
def deleteUser(request, uuid):
  user = User.objects.get(uuid=uuid)
  user.delete()
  return Response("User Deleted")

# # Views for Favorites data
# @api_view(['GET'])
# def getUserFavorites(request):
#   favorites = Favorite.objects.select_related('users_set')
#   serializer = FavoriteSerializer(favorites, many=True)
#   return Response(serializer.data)

# @api_view(['POST'])
# def addNewFavorite(request):
#   serializer = FavoriteSerializer(data=request.data)
#   if serializer.is_valid():
#     serializer.save()
#   return Response(serializer.data)

# @api_view(['DELETE'])
# def removeFavorite(request, pk):
#   favorite = Favorite.objects.get(pk=pk)
#   favorite.delete()
#   return Response("Favorite Deleted")

# Views for Product data
@api_view(['GET'])
def getProductData(request, id):
  try:
    product = Product.objects.get(pk=id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)
  except:
    return Response(serializer.errors)

@api_view(['POST'])
def addNewProduct(request):
  serializer = ProductSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  else: 
    return Response(serializer.errors)

@api_view(['PATCH'])
def editProductData(request, id):
  try:
    product = Product.objects.get(pk=id)
    product.product_name = request.data.get('product_name', product.product_name)
    store = request.data.get('store')
    if store:
      store = Store.objects.get(store=store)
      product.store_id = store.id
    product.start_date = request.data.get('start_date', product.start_date)
    product.end_date = request.data.get('end_date', product.end_date)
    product.sources = request.data.get('sources', product.sources)
    product.save()
    serializer = ProductSerializer(product)
    return Response(serializer.data)
  except Exception as e:
    return Response({'error': str(e)})

@api_view(['DELETE'])
def deleteProductData(request, id):
  product = Product.objects.get(pk=id)
  product.delete()
  return Response("Product Deleted")

# Views for Store data
@api_view(['GET'])
def getStoreData(request, id):
  try:
    store = Store.objects.get(pk=id)
    serializer = StoreSerializer(store)
    return Response(serializer.data)
  except:   
    return Response(serializer.errors)

@api_view(['POST'])
def addNewStore(request):
  serializer = StoreSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  else: 
    return Response(serializer.errors)

@api_view(['PATCH'])
def editStoreData(request, id):
  try:
    store = Store.objects.get(pk=id)
    store.name = request.data.get('name', store.name)
    prefecture = request.data.get('prefecture')
    if prefecture:
      location = Location.objects.get(prefecture=prefecture)
      store.location_id = location.id
    store.save()
    serializer = StoreSerializer(store)
    return Response(serializer.data)
  except Exception as e:
    return Response({'error': str(e)})

@api_view(['DELETE'])
def deleteStoreData(request, id):
  store = Store.objects.get(pk=id)
  store.delete()
  return Response("Store Deleted")

@api_view(['POST'])
def addLocation(request):
  serializer = LocationSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)