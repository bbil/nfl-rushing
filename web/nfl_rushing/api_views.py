from django.http import Http404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status, serializers

from .data.fetch_nfl_rushing import fetch_nfl_rushing
from .view_helpers import read_query_args
from .models import NflPlayerRushing

class NflPlayerRushingSerializer(serializers.ModelSerializer):
    class Meta:
        model = NflPlayerRushing
        exclude = ['id']

NFL_RUSHING_PAGE_SIZE = 10

class NflRushingListView(APIView, PageNumberPagination):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        page_number, name_filter, sort_option, sort_direction = read_query_args(request)

        rushing_data = fetch_nfl_rushing(
            name_filter=name_filter,
            sort_option=sort_option,
            sort_direction=sort_direction
        )

        paginator = Paginator(rushing_data, NFL_RUSHING_PAGE_SIZE)

        try:
            page = paginator.page(page_number)
        except PageNotAnInteger:
            page = paginator.page(1)
        except EmptyPage:
            page = paginator.page(paginator.num_pages)

        serializer = NflPlayerRushingSerializer(page, many=True)
        return Response({
            "data": serializer.data,
            "page_number": page.number,
            "num_pages": paginator.num_pages
        })
