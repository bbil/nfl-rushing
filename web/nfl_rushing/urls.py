from django.urls import path, include
from rest_framework import routers

from . import views

from .api_views import NflRushingListView

app_name = 'nfl_rushing'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('csv', views.download_csv, name='download_csv'),
    path('filter-name', views.filter_name, name='filter_name'),
    path('api', NflRushingListView.as_view())
]
