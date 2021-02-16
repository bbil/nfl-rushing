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
    else:
        query_set = query_set.order_by('pk')

    return query_set

def write_to_csv(csv_writer, nfl_rushing_queryset):
    csv_writer.writerow([
        'Name', 'Team', 'Position', 'Rushing Attempts', 'Rushing attempts per game',
        'Total rushing yards', 'Rushing yards per attempt', 'Rushing yards per game',
        'Total rushing touchdowns', 'Longest Rush', 'Longest rush was touchdown',
        'Rush first downs', 'Rush first down %', 'Rush 20+ yards', 'Rush 40+ yards', 'Rush fumbles'
    ])
    for player in nfl_rushing_queryset:
        csv_writer.writerow([
            player.name, player.team, player.position, player.rushing_attempts,
            player.rushing_attempts_per_game, player.total_rushing_yards, player.rushing_yards_per_attempt,
            player.rushing_yards_per_game, player.total_rushing_touchdowns, player.longest_rush,
            str(player.longest_rush_touchdown).lower(), player.rush_first_downs, player.rush_first_down_percent,
            player.rush_20_plus, player.rush_40_plus, player.rush_fumbles
        ])
