from .data.fetch_nfl_rushing import SortOption, SortDirection

# Helper to read common arguments from the request and do processing to create instances of the Enums
def read_query_args(request):
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