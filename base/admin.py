from django.contrib import admin
from .models import Location, User, Product, Bookmark, Log

admin.site.register(Location)
admin.site.register(User)
admin.site.register(Product)
admin.site.register(Bookmark)
admin.site.register(Log)