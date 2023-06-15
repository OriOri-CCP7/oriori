from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import User, Favorite, Location, Store, Product, Review
from base.serializers import UserSerializer, FavoriteSerializer, LocationSerializer, StoreSerializer, ProductSerializer, ReviewSerializer
from django.db.models import Count

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
    location_id = request.data.get('location')
    if location_id:
      location = Location.objects.get(pk=location_id)
      user.location_id = location.pk
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

# Views for Favorites data
@api_view(['GET'])
def getUserFavorites(request, uuid):
  try:
    favorites = Favorite.objects.filter(user__uuid=uuid)
    serializer = FavoriteSerializer(favorites, many=True)
    return Response(serializer.data)
  except:
    return Response(serializer.errors)

@api_view(['POST'])
def addNewFavorite(request, uuid):
  product_id = request.data.get('product_id')
  user = User.objects.get(uuid=uuid)
  product = Product.objects.get(id=product_id)
  data = {
    "user": user.pk,
    "product": product.pk
  }
  serializer = FavoriteSerializer(data=data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  else: 
    return Response(serializer.errors)

@api_view(['DELETE'])
def removeFavorite(request, uuid, fav_id):
  try:
    user = User.objects.get(uuid=uuid)
    favorite = Favorite.objects.get(id=fav_id, user=user)
    favorite.delete()
    return Response("Favorite Deleted")
  except Exception as e:
    return Response({'error': str(e)})

# Views for Product data
@api_view(['GET'])
def getProductDataById(request, id):
  try:
    product = Product.objects.get(pk=id)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
  except:
    return Response(serializer.errors)
  
@api_view(['GET'])
def getProductDataByUser(request, uuid):
  try:
    user = User.objects.get(uuid=uuid)
    favorites = Product.objects.filter(favorite__user_id=user)
    serializer = ProductSerializer(favorites, many=True)
    return Response(serializer.data)
  except:
    return Response(serializer.errors)
  
@api_view(['GET'])
def getProductDataByPrefecture(request, prefId):
  try:
    products = Product.objects.filter(location__id=prefId)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
  except Exception as e:
    return Response({'error': str(e)})
  
@api_view(['GET'])
def getProductDataByPopularity(request):
  try:
    products = Product.objects.annotate(num_favs=Count('favorite')).order_by("num_favs").reverse()
    serializer = ProductSerializer(products[0:10], many=True)
    return Response(serializer.data)
  except Exception as e:
    return Response({'error': str(e)})

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
    product.img_url = request.data.get('img_url', product.img_url)
    product.link_url = request.data.get('link_url', product.link_url)
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
def getStoreDatabyId(request, id):
  try:
    store = Store.objects.get(pk=id)
    serializer = StoreSerializer(store)
    return Response(serializer.data)
  except:   
    return Response(serializer.errors)
  
@api_view(['GET'])
def getStoreDatabyPrefecture(request, prefecture):
  try:
    stores = Store.objects.filter(location__prefecture=prefecture)
    serializer = StoreSerializer(stores, many=True)
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

# Views for Review data
@api_view(['GET'])
def getReviewsForUser(request, uuid):
  try:
    user = User.objects.get(uuid=uuid)
    reviews = Review.objects.filter(user__id=user.pk)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)
  except:
    return Response(serializer.errors)
  
@api_view(['POST'])
def addNewReview(request, uuid):
  user = User.objects.get(uuid=uuid)
  product_id = request.data.get('product')
  product = Product.objects.get(id=product_id)
  rating = request.data.get('rating')
  comment = request.data.get('comment')
  data = {
    "user": user.pk,
    "product": product.pk,
    "rating": rating,
    "comment": comment
  }
  serializer = ReviewSerializer(data=data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  else: 
    return Response(serializer.errors)
  
@api_view(['DELETE'])
def removeReview(request, uuid, review_id):
  try:
    user = User.objects.get(uuid=uuid)
    review = Review.objects.get(id=review_id, user=user)
    review.delete()
    return Response("Review Deleted")
  except Exception as e:
    return Response({'error': str(e)})
  
@api_view(['GET'])
def getUserReviewedProducts(request, uuid):
  try:
    user = User.objects.get(uuid=uuid)
    reviews = Product.objects.filter(review__user_id=user)
    serializer = ProductSerializer(reviews, many=True)
    return Response(serializer.data)
  except:
    return Response(serializer.errors)
  
@api_view(['PATCH'])
def editReviewData(request, uuid, review_id):
  try:
    user = User.objects.get(uuid=uuid)
    review = Review.objects.get(id=review_id)
    if review.user.pk == user.pk:
      review.rating = request.data.get('rating', review.rating)
      review.comment = request.data.get('comment', review.comment)
      review.save()
    serializer = ProductSerializer(review)
    return Response(serializer.data)
  except Exception as e:
    return Response({'error': str(e)})
