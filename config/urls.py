"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.hello),
    path('api/users/', views.getAllUsers),
    path('api/user/<str:uuid>/', views.getUserData),
    path('api/newUser/', views.addNewUser),
    path('api/editedUser/<str:uuid>/', views.editUserData),
    path('api/deletion/<str:uuid>/', views.deleteUser),
    path('api/<int:id>/favorites/', views.getUserFavorites),
    path('api/<int:id>/newFavorite/', views.addNewFavorite),
    path('api/<int:id>/favorites/deletion/', views.removeFavorite),
    path('api/product/<int:id>/', views.getProductDataById),
    path('api/product/<str:uuid>/favorites/', views.getProductDataByUser),
    path('api/<str:prefecture>/products/', views.getProductDataByPrefecture),
    path('api/newProduct/', views.addNewProduct),
    path('api/editedProduct/<int:id>/', views.editProductData),
    path('api/product/deletion/<int:id>/', views.deleteProductData),
    path('api/store/<int:id>/', views.getStoreDatabyId),
    path('api/newStore/', views.addNewStore),
    path('api/editedStore/<int:id>/', views.editStoreData),
    path('api/store/deletion/<int:id>/', views.deleteStoreData),
    path('api/newLocation/', views.addLocation),
]
