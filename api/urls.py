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
    path('products/<int:id>/', views.getProductDataById),
    path('products/<str:uuid>/favorites/', views.getProductDataByUser),
    path('<int:prefId>/products/', views.getProductDataByPrefecture),
    path('products/popularity/', views.getProductDataByPopularity),
    path('products/newProduct/', views.addNewProduct),
    path('products/<int:id>/edit/', views.editProductData),
    path('products/<int:id>/deletion/', views.deleteProductData),
    path('stores/<int:id>/', views.getStoreDatabyId),
    path('<str:prefecture>/stores/', views.getStoreDatabyPrefecture),
    path('stores/newStore/', views.addNewStore),
    path('stores/<int:id>/edit/', views.editStoreData),
    path('stores/<int:id>/deletion/', views.deleteStoreData),
    path('locations/newLocation/', views.addLocation),
]