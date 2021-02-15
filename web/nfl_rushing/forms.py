from django import forms

class FilterForm(forms.Form):
    player_name = forms.CharField(label='Player name', max_length=100)
