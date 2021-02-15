from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# Create your views here.
from .data.fetch_nfl_rushing import fetch_nfl_rushing

NFL_RUSHING_PAGE_SIZE = 10

def index(request):
    page_number = request.GET.get('page', 1)
    name_filter = request.GET.get('name_filter', '')

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

        'next_page': page.next_page_number() if page.has_next() else None,
        'previous_page': page.previous_page_number() if page.has_previous() else None,
        'has_other_pages': page.has_other_pages(),
    })