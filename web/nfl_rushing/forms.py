from django import forms

# Form used by index page to filter the data by player name
class FilterForm(forms.Form):
    player_name = forms.CharField(label='Player name', max_length=100)
