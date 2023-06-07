from django.urls import path
from . import views

urlpatterns = [
    path('user/<str:username>/', views.getUserData),
    path('users/', views.getAllUsers),
    path('user/<str:uuid>/', views.getUserData),
    path('newUser/', views.addNewUser),
    path('editedUser/<str:uuid>/', views.editUserData),
    path('deletion/<str:uuid>/', views.deleteUser),
    path('<int:id>/favorites/', views.getUserFavorites),
    path('<int:id>/newFavorite/', views.addNewFavorite),
    path('<int:id>/favorites/deletion/', views.removeFavorite),
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