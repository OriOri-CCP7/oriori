from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.getAllUsers),
    path('users/newUser/', views.addNewUser),
    path('users/<str:uuid>/', views.getUserData),
    path('users/<str:uuid>/edit/', views.editUserData),
    path('users/<str:uuid>/deletion/', views.deleteUser),
    path('users/<str:uuid>/reviews/', views.getReviewsForUser),
    path('users/<str:uuid>/reviews/newReview/', views.addNewReview),
    path('users/<str:uuid>/reviews/deletion/<int:review_id>/', views.removeReview),
    path('users/<str:uuid>/favorites/', views.getUserFavorites),
    path('users/<str:uuid>/favorites/products/', views.getProductDataByUser),
    path('users/<str:uuid>/favorites/newFavorite/', views.addNewFavorite),
    path('users/<str:uuid>/favorites/deletion/<int:fav_id>/', views.removeFavorite),
    path('products/popular/', views.getProductDataByPopularity),
    path('products/newProduct/', views.addNewProduct),
    path('products/<int:id>/', views.getProductDataById),
    path('products/<int:id>/edit/', views.editProductData),
    path('products/<int:id>/deletion/', views.deleteProductData),
    path('stores/newStore/', views.addNewStore),
    path('stores/<int:id>/', views.getStoreDatabyId),
    path('stores/<int:id>/edit/', views.editStoreData),
    path('stores/<int:id>/deletion/', views.deleteStoreData),
    path('locations/newLocation/', views.addLocation),
    path('locations/<int:prefId>/products/', views.getProductDataByPrefecture),
    path('locations/<str:prefecture>/stores/', views.getStoreDatabyPrefecture),
]