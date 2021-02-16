from django.test import TestCase

from nfl_rushing.models import NflPlayerRushing

from .utils import reverse_with_args

class TestIndexDataQuerying(TestCase):
    def test_redirects_to_index_with_filter(self):
        url = reverse_with_args(
            'nfl_rushing:filter_name',
            query_kwargs={
                'player_name': 'bob'
            }
        )
        response = self.client.get(url, follow=True)
        self.assertRedirects(response, '/nfl-rushing/?name_filter=bob')
    
    def test_bad_form_data_redirects_to_index_no_filter(self):
        url = reverse_with_args(
            'nfl_rushing:filter_name',
            query_kwargs={
                'bad_data': 'bob'
            }
        )
        response = self.client.get(url, follow=True)
        self.assertRedirects(response, '/nfl-rushing/')
