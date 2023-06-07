from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.getAllUsers),
    path('users/<str:uuid>/', views.getUserData),
    path('users/newUser/', views.addNewUser),
    path('users/<str:uuid>/edit/', views.editUserData),
    path('users/<str:uuid>/deletion/', views.deleteUser),
    path('favorites/<str:uuid>/', views.getUserFavorites),
    path('favorites/<str:uuid>/newFavorite/', views.addNewFavorite),
    path('favorites/<str:uuid>/deletion/', views.removeFavorite),
    path('product/<int:id>/', views.getProductDataById),
    path('product/<str:uuid>/favorites/', views.getProductDataByUser),
    path('<int:prefId>/products/', views.getProductDataByPrefecture),
    path('products/popular/', views.getProductDataByPopularity),
    path('newProduct/', views.addNewProduct),
    path('editedProduct/<int:id>/', views.editProductData),
    path('product/deletion/<int:id>/', views.deleteProductData),
    path('store/<int:id>/', views.getStoreDatabyId),
    path('<str:prefecture>/stores/', views.getStoreDatabyPrefecture),
    path('newStore/', views.addNewStore),
    path('editedStore/<int:id>/', views.editStoreData),
    path('store/deletion/<int:id>/', views.deleteStoreData),
    path('newLocation/', views.addLocation),
]