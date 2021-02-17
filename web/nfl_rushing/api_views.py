from django.http import Http404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status, serializers

from .data.fetch_nfl_rushing import fetch_nfl_rushing, SortOption, SortDirection, write_to_csv
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
        page_number, name_filter, sort_option, sort_direction = _read_query_args(request)

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

# Helper to read common arguments from the request and do processing to create instances of the Enums
def _read_query_args(request):
    page_number = request.GET.get('page', 1)
    name_filter = request.GET.get('name_filter', None)
    sort_option = request.GET.get('sort_option', None)
    sort_direction = request.GET.get('sort_direction', None)

    if sort_option:
        try:
            sort_option = SortOption(sort_option)
        except ValueError:
            sort_option = None
    if sort_direction:
        try:
            sort_direction = SortDirection(sort_direction)
        except ValueError:
            sort_direction = None

    return page_number, name_filter, sort_option, sort_direction