from nfl_rushing.models import NflPlayerRushing

def fetch_nfl_rushing(name_filter=None):
    query_set = NflPlayerRushing.objects.all()

    if name_filter is not None:
        query_set = query_set.filter(name__icontains=name_filter)

    return query_set
