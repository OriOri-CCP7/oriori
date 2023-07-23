from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import User, Location, Product, Bookmark, Log
from base.serializers import UserSerializer, LocationSerializer, ProductSerializer, BookmarkSerializer, LogSerializer
from django.db.models import Count, When, Case, Q
from datetime import date

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

# Views for Bookmarks data
@api_view(['GET'])
def getUserBookmarks(request, uuid):
  try:
    bookmarks = Bookmark.objects.filter(user__uuid=uuid)
    serializer = BookmarkSerializer(bookmarks, many=True)
    return Response(serializer.data)
  except:
    return Response(serializer.errors)

@api_view(['POST'])
def addNewBookmark(request, uuid):
  product_id = request.data.get('product')
  user = User.objects.get(uuid=uuid)
  product = Product.objects.get(id=product_id)
  data = {
    "user": user.pk,
    "product": product.pk
  }
  serializer = BookmarkSerializer(data=data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  else: 
    return Response(serializer.errors)

@api_view(['DELETE'])
def removeBookmark(request, uuid, bkmark_id):
  try:
    user = User.objects.get(uuid=uuid)
    bookmark = Bookmark.objects.get(id=bkmark_id, user=user)
    bookmark.delete()
    return Response("Bookmark Deleted")
  except Exception as e:
    return Response({'error': str(e)})

# Views for Product data
@api_view(['GET'])
def getAllProducts(request):
  product = Product.objects.all()
  serializer = ProductSerializer(product, many=True)
  return Response(serializer.data)


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
    today = date.today()
    user = User.objects.get(uuid=uuid)
    products = Product.objects.filter(bookmark__user_id=user)
    product_list = []
    endingSoon = products.filter(Q(start_date__isnull=True) | Q(start_date__lte=today)).exclude(Q(end_date__isnull=True) | Q(end_date__lte=today)).order_by('end_date')
    for product in endingSoon:
      product_list.append(product)
    upcoming = products.filter(Q(start_date__isnull=False) & Q(start_date__gt=today)).order_by('start_date')
    for product in upcoming:
      product_list.append(product)
    started = products.filter(Q(start_date__isnull=False) & Q(start_date__lte=today), end_date__isnull=True).order_by('-start_date')
    for product in started:
      product_list.append(product)
    ended = products.filter(Q(end_date__isnull=False) & Q(end_date__lte=today)).order_by('-end_date')
    for product in ended:
      product_list.append(product)
    nodata = products.filter(start_date__isnull=True, end_date__isnull=True).order_by('product_name')
    for product in nodata:
      product_list.append(product)
    
    serializer = ProductSerializer(product_list, many=True)
    return Response(serializer.data)
  except:
    return Response(serializer.errors)
  
@api_view(['GET'])
def getProductDataByPrefecture(request, prefId):
  try:
    today = date.today()
    product_list = []
    products = Product.objects.filter(location__id=prefId)
    endingSoon = products.filter(Q(start_date__isnull=True) | Q(start_date__lte=today)).exclude(Q(end_date__isnull=True) | Q(end_date__lte=today)).order_by('end_date')
    for product in endingSoon:
      product_list.append(product)
    upcoming = products.filter(Q(start_date__isnull=False) & Q(start_date__gt=today)).order_by('start_date')
    for product in upcoming:
      product_list.append(product)
    started = products.filter(Q(start_date__isnull=False) & Q(start_date__lte=today), end_date__isnull=True).order_by('-start_date')
    for product in started:
      product_list.append(product)
    ended = products.filter(Q(end_date__isnull=False) & Q(end_date__lte=today)).order_by('-end_date')
    for product in ended:
      product_list.append(product)
    nodata = products.filter(start_date__isnull=True, end_date__isnull=True).order_by('product_name')
    for product in nodata:
      product_list.append(product)
    
    serializer = ProductSerializer(product_list, many=True)
    return Response(serializer.data)
  except Exception as e:
    return Response({'error': str(e)})
  
@api_view(['GET'])
def getProductDataByPopularity(request):
  try:
    popular_product_list = []
    for log in Log.objects.values('product__id').annotate(num_likes=Count(Case(When(liked_it=True, then=1)))).order_by('-num_likes'):
      if log['num_likes'] != 0:
        popular_product_list.append(Product.objects.get(id=log['product__id']))
    serializer = ProductSerializer(popular_product_list[0:10], many=True)
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
    product.start_date = request.data.get('start_date', product.start_date)
    product.end_date = request.data.get('end_date', product.end_date)
    product.img_url = request.data.get('img_url', product.img_url)
    product.link_url = request.data.get('link_url', product.link_url)
    product.location = request.data.get('location', product.location)
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

# Views for Location Data
@api_view(['POST'])
def addLocation(request):
  serializer = LocationSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

# Views for Log data
@api_view(['GET'])
def getLogsForUser(request, uuid):
  try:
    user = User.objects.get(uuid=uuid)
    logs = Log.objects.filter(user__id=user.pk)
    serializer = LogSerializer(logs, many=True)
    return Response(serializer.data)
  except:
    return Response(serializer.errors)
  
@api_view(['POST'])
def addNewLog(request, uuid):
  user = User.objects.get(uuid=uuid)
  product_id = request.data.get('product')
  product = Product.objects.get(id=product_id)
  data = {
    "user": user.pk,
    "product": product.pk,
  }
  serializer = LogSerializer(data=data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  else: 
    return Response(serializer.errors)
  
@api_view(['GET'])
def getUsersLoggedProducts(request, uuid):
  try:
    today = date.today()
    user = User.objects.get(uuid=uuid)
    products = Product.objects.filter(log__user_id=user)
    product_list = []
    endingSoon = products.filter(Q(start_date__isnull=True) | Q(start_date__lte=today)).exclude(Q(end_date__isnull=True) | Q(end_date__lte=today)).order_by('end_date')
    for product in endingSoon:
      product_list.append(product)
    upcoming = products.filter(Q(start_date__isnull=False) & Q(start_date__gt=today)).order_by('start_date')
    for product in upcoming:
      product_list.append(product)
    started = products.filter(Q(start_date__isnull=False) & Q(start_date__lte=today), end_date__isnull=True).order_by('-start_date')
    for product in started:
      product_list.append(product)
    ended = products.filter(Q(end_date__isnull=False) & Q(end_date__lte=today)).order_by('-end_date')
    for product in ended:
      product_list.append(product)
    nodata = products.filter(start_date__isnull=True, end_date__isnull=True).order_by('product_name')
    for product in nodata:
      product_list.append(product)
    
    serializer = ProductSerializer(product_list, many=True)
    return Response(serializer.data)
  except:
    return Response(serializer.errors)

@api_view(['DELETE'])
def removeLog(request, uuid, log_id):
  try:
    user = User.objects.get(uuid=uuid)
    log = Log.objects.get(id=log_id, user=user)
    log.delete()
    return Response("Log Deleted")
  except Exception as e:
    return Response({'error': str(e)})
  
  
@api_view(['PATCH'])
def editLog(request, uuid, log_id):
  try:
    user = User.objects.get(uuid=uuid)
    log = Log.objects.get(id=log_id)
    if log.user.pk == user.pk:
      log.liked_it = request.data.get('liked_it', log.liked_it)
      log.save()
    serializer = ProductSerializer(log)
    return Response(serializer.data)
  except Exception as e:
    return Response({'error': str(e)})
