from django.db import models

# Create your models here.

class NflPlayerRushing(models.Model):
    name = models.CharField(max_length=50)
    team = models.CharField(max_length=3)
    position = models.CharField(max_length=2)

    rushing_attempts = models.IntegerField()
    rushing_attempts_per_game = models.FloatField()

    total_rushing_yards = models.IntegerField()
    rushing_yards_per_attempt = models.FloatField()
    rushing_yards_per_game = models.FloatField()

    total_rushing_touchdowns = models.IntegerField()

    longest_rush = models.IntegerField()
    longest_rush_touchdown = models.BooleanField()

    rush_first_downs = models.IntegerField()
    rush_first_down_percent = models.FloatField()

    rush_20_plus = models.IntegerField()
    rush_40_plus = models.IntegerField()

    rush_fumbles = models.IntegerField()
