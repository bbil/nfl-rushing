from django.urls import path

from . import views

app_name = 'nfl_rushing'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('csv', views.download_csv, name='download_csv')
]
