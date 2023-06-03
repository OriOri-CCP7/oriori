from django.views.generic import TemplateView

# this file is to render the html page.

index = TemplateView.as_view(template_name='index.html')