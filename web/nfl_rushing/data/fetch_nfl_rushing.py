from nfl_rushing.models import NflPlayerRushing

from enum import Enum

class SortOption(Enum):
    # directly related to model fields
    TOTAL_RUSHING_YARDS = 'total_rushing_yards'
    LONGEST_RUSH = 'longest_rush'
    TOTAL_RUSHING_TOUCHDOWNS = 'total_rushing_touchdowns'

class SortDirection(Enum):
    INC = 'inc'
    DESC = 'desc'

def fetch_nfl_rushing(name_filter=None, sort_option=None, sort_direction=None):
    query_set = NflPlayerRushing.objects.all()

    if name_filter is not None:
        query_set = query_set.filter(name__icontains=name_filter)

    if sort_option is not None:
        sort_direction = sort_direction or SortDirection.DESC

        order_by_value = sort_option.value
        if sort_direction is SortDirection.DESC:
            order_by_value = f'-{order_by_value}'
        query_set = query_set.order_by(order_by_value)

    return query_set
