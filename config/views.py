from django.shortcuts import render

# this file is to render the html page.

def index(request):
    return render(request, 'index.html')