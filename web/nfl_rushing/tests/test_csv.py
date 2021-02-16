from django.test import TestCase

from nfl_rushing.models import NflPlayerRushing

from .utils import reverse_with_args

class TestCsvDownload(TestCase):
    fixtures = ['test_data.json']

    CSV_HEADER = 'Name,Team,Position,Rushing Attempts,Rushing attempts per game,Total rushing yards,Rushing yards per attempt,Rushing yards per game,Total rushing touchdowns,Longest Rush,Longest rush was touchdown,Rush first downs,Rush first down %,Rush 20+ yards,Rush 40+ yards,Rush fumbles'

    player_1 = 'Person 1,A,QB,0,0.0,0,0.0,0.0,2,1,false,0,0.0,0,0,0'
    player_2 = 'Person 2,B,QB,1,1.0,1,1.0,1.1,1,0,false,1,1.0,1,1,1'
    player_3 = 'Person 3,C,QB,2,2.0,2,2.0,2.0,0,2,false,2,2.0,2,2,2'

    def test_csv_download(self):
        response = self.client.get(reverse_with_args('nfl_rushing:download_csv'))
        self.assertEqual(response.status_code, 200)

        expected_content = '\r\n'.join([self.CSV_HEADER, self.player_1, self.player_2, self.player_3])

        self.assertEqual(response.content.decode('utf-8').strip(), expected_content)
    
    def test_csv_download_with_filter(self):
        url = reverse_with_args(
            'nfl_rushing:download_csv',
            query_kwargs={
                'name_filter': '2'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        expected_content = '\r\n'.join([self.CSV_HEADER, self.player_2])

        self.assertEqual(response.content.decode('utf-8').strip(), expected_content)
    
    def test_csv_download_with_sort(self):
        url = reverse_with_args(
            'nfl_rushing:download_csv',
            query_kwargs={
                'sort_option': 'longest_rush'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        expected_content = '\r\n'.join([self.CSV_HEADER, self.player_3, self.player_1, self.player_2])

        self.assertEqual(response.content.decode('utf-8').strip(), expected_content)

    def test_csv_download_with_sort_inc(self):
        url = reverse_with_args(
            'nfl_rushing:download_csv',
            query_kwargs={
                'sort_option': 'longest_rush',
                'sort_direction': 'asc'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        expected_content = '\r\n'.join([self.CSV_HEADER, self.player_2, self.player_1, self.player_3])

        self.assertEqual(response.content.decode('utf-8').strip(), expected_content)