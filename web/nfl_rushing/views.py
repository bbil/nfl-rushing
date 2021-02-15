import csv
 
from django.views import View
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from .data.fetch_nfl_rushing import fetch_nfl_rushing

NFL_RUSHING_PAGE_SIZE = 10

class IndexView(View):
    template_name = "nfl_rushing/index.html"

    def _read_query_args(self, request):
        page_number = request.GET.get('page', 1)
        name_filter = request.GET.get('name_filter', '')

        return page_number, name_filter

    def _create_csv_link(self, name_filter):
        return f'/nfl-rushing/csv?name_filter={name_filter}'

    def _create_next_page_link(self, page, name_filter):
        if not page.has_next():
            return None
        
        return f'?page={page.next_page_number()}&name_filter={name_filter}'

    def _create_previous_page_link(slef, page, name_filter):
        if not page.has_previous():
            return None
        
        return f'?page={page.previous_page_number()}&name_filter={name_filter}'

    def get(self, request):
        page_number, name_filter = self._read_query_args(request)

        data_query_set = fetch_nfl_rushing(name_filter=name_filter)
        paginator = Paginator(data_query_set, NFL_RUSHING_PAGE_SIZE)

        try:
            page = paginator.page(page_number)
        except PageNotAnInteger:
            page = paginator.page(1)
        except EmptyPage:
            page = paginator.page(paginator.num_pages)
    
        return render(request, 'nfl_rushing/index.html', {
            'current_page': page.object_list,
            'current_page_number': page.number,
            'number_of_pages': paginator.num_pages,
            'total': page.count,

            'next_page': self._create_next_page_link(page, name_filter),
            'previous_page': self._create_previous_page_link(page, name_filter),

            'csv_link': self._create_csv_link(name_filter),
            'has_other_pages': page.has_other_pages(),
        })

def download_csv(request):
    name_filter = request.GET.get('name_filter', '')

    data_query_set = fetch_nfl_rushing(name_filter=name_filter)

    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="nfl_rushing.csv"'

    writer = csv.writer(response)
    writer.writerow([
        'Name', 'Team', 'Position', 'Rushing Attempts', 'Rushing attempts per game',
        'Total rushing yards', 'Rushing yards per attempt', 'Rushing yards per game',
        'Total rushing touchdowns', 'Longest Rush', 'Longest rush was touchdown',
        'Rush first downs', 'Rush first down %', 'Rush 20+ yards', 'Rush 40+ yards', 'Rush fumbles'
    ])
    for player in data_query_set:
        writer.writerow([
            player.name, player.team, player.position, player.rushing_attempts,
            player.rushing_attempts_per_game, player.total_rushing_yards, player.rushing_yards_per_attempt,
            player.rushing_yards_per_game, player.total_rushing_touchdowns, player.longest_rush,
            str(player.longest_rush_touchdown).lower(), player.rush_first_downs, player.rush_first_down_percent,
            player.rush_20_plus, player.rush_40_plus, player.rush_fumbles
        ])

    return response