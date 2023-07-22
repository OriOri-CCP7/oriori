from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.getAllUsers),
    path('users/newUser/', views.addNewUser),
    path('users/<str:uuid>/', views.getUserData),
    path('users/<str:uuid>/edit/', views.editUserData),
    path('users/<str:uuid>/deletion/', views.deleteUser),
    path('users/<str:uuid>/logs/', views.getLogsForUser),
    path('users/<str:uuid>/logs/products/', views.getUsersLoggedProducts),
    path('users/<str:uuid>/logs/new/', views.addNewLog),
    path('users/<str:uuid>/logs/<int:log_id>/edit/', views.editLog),
    path('users/<str:uuid>/logs/<int:log_id>/deletion/', views.removeLog),
    path('users/<str:uuid>/bookmarks/', views.getUserBookmarks),
    path('users/<str:uuid>/bookmarks/products/', views.getProductDataByUser),
    path('users/<str:uuid>/bookmarks/new/', views.addNewBookmark),
    path('users/<str:uuid>/bookmarks/<int:bkmark_id>/deletion/', views.removeBookmark),
    path('products/', views.getAllProducts),
    path('products/popular/', views.getProductDataByPopularity),
    path('products/newProduct/', views.addNewProduct),
    path('products/<int:id>/', views.getProductDataById),
    path('products/<int:id>/edit/', views.editProductData),
    path('products/<int:id>/deletion/', views.deleteProductData),
    path('locations/newLocation/', views.addLocation),
    path('locations/<int:prefId>/products/', views.getProductDataByPrefecture),
]