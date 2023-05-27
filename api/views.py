from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..base import <insert model class here>
from ..serializers import <insert serializer class here>

# Create your views here.

@api_view(['GET'])
def hello(request):
   return Response('Hello World 🌎')

# Views for user's data
@api_view(['GET'])
def getUserData(request):
  query_parameter = request.query_params.get('uuid')
  user = Users.objects.get(uuid=query_parameter)
  serializer = UsersSerializer(user, many=False)
  return Response(serializer.data)

@api_view(['POST'])
def addNewUser(request):
  serializer = UsersSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

@api_view(['PATCH'])
def editUserData(request, uuid):
  user = Users.objects.get(uuid=uuid)
  user.username = request.data.get('username', user.username)
  user.email = request.data.get('email', user.email)
  user.location_id = request.data.get('location_id', user.location_id)