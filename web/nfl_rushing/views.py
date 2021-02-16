import csv
 
from django.views import View
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

from .forms import FilterForm

from .data.fetch_nfl_rushing import fetch_nfl_rushing, SortOption, SortDirection, write_to_csv

NFL_RUSHING_PAGE_SIZE = 10

# Main view, responsible for:
# - querying the data, based on the query arguments
# - setting up urls to be used by anchor tags: sorting/pagination
# - gathering context and sending to the template to be rendered
class IndexView(View):
    def _create_csv_link(self, query_dict):
        return f'/nfl-rushing/csv?{query_dict.urlencode()}'

    def _create_next_page_link(self, page, query_dict):
        if not page.has_next():
            return None

        return f'?page={page.next_page_number()}&{query_dict.urlencode()}'

    def _create_previous_page_link(self, page, query_dict):
        if not page.has_previous():
            return None

        return f'?page={page.previous_page_number()}&{query_dict.urlencode()}'

    def _create_sorting_links(self, query_dict):
        query_dict = query_dict.copy()

        current_sorted = None
        current_sorted_direction_next = 'inc'

        if 'sort_option' in query_dict:
            current_sorted = query_dict['sort_option']
            del query_dict['sort_option']
        if 'sort_direction' in query_dict:
            if query_dict['sort_direction'] == 'desc':
                current_sorted_direction_next = 'inc'
            else:
                current_sorted_direction_next = 'desc'
            del query_dict['sort_direction']
        
        links = {
            'total_rushing_yards': f'?sort_option=total_rushing_yards&sort_direction=desc&{query_dict.urlencode()}',
            'longest_rush': f'?sort_option=longest_rush&sort_direction=desc&{query_dict.urlencode()}',
            'total_rushing_touchdowns': f'?sort_option=total_rushing_touchdowns&sort_direction=desc&{query_dict.urlencode()}'
        }
        
        # if there is currently sorting happening on one of the columns, set its url to be the reverse
        # of what it currently is
        if current_sorted:
            links[current_sorted] = f'?sort_option={current_sorted}&sort_direction={current_sorted_direction_next}&{query_dict.urlencode()}'

        return links

    def get(self, request):
        page_number, name_filter, sort_option, sort_direction = _read_query_args(request)
        query_dict = request.GET.copy()
        if 'page' in query_dict:
            del query_dict['page']

        data_query_set = fetch_nfl_rushing(
            name_filter=name_filter,
            sort_option=sort_option,
            sort_direction=sort_direction
        )
        paginator = Paginator(data_query_set, NFL_RUSHING_PAGE_SIZE)

        try:
            page = paginator.page(page_number)
        except PageNotAnInteger:
            page = paginator.page(1)
        except EmptyPage:
            page = paginator.page(paginator.num_pages)
    
        return render(request, 'nfl_rushing/index.html', {
            # NflPlayerRushing objects to render
            'current_page': page.object_list,

            # pagination info/links
            'current_page_number': page.number,
            'number_of_pages': paginator.num_pages,
            'has_other_pages': page.has_other_pages(),
            'next_page': self._create_next_page_link(page, query_dict),
            'previous_page': self._create_previous_page_link(page, query_dict),
            'total': page.count,

            # link to download the csv
            'csv_link': self._create_csv_link(query_dict),

            # links for all the sorting
            'sorting_links': self._create_sorting_links(query_dict),

            # current filter to render into form input
            'current_name_filter': name_filter or '',
        })

# View that allows for downloading a CSV file based on the current arguments
# does not render a new view, because of the Content-Disposition header
# the browser will save the resulting CSV file to Downloads
def download_csv(request):
    _, name_filter, sort_option, sort_direction = _read_query_args(request)

    data_query_set = fetch_nfl_rushing(
       name_filter=name_filter,
       sort_option=sort_option,
       sort_direction=sort_direction
    )

    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="nfl_rushing.csv"'

    writer = csv.writer(response)
    write_to_csv(writer, data_query_set)
    return response

# View invoked by the <form>
# simply redirects to the main index view
def filter_name(request):
    # create a form instance and populate it with data from the request:
    form = FilterForm(request.GET)
    # check whether it's valid:
    if form.is_valid():
        name_filter = form.cleaned_data['player_name']
        return HttpResponseRedirect(f'/nfl-rushing?name_filter={name_filter}')
    return HttpResponseRedirect(f'/nfl-rushing')

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