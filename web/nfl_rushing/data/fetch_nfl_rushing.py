from nfl_rushing.models import NflPlayerRushing

def fetch_nfl_rushing():
    return NflPlayerRushing.objects.all()
