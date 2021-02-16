from django.test import TestCase

from nfl_rushing.models import NflPlayerRushing

from .utils import reverse_with_args

class TestIndexDataQuerying(TestCase):
    fixtures = ['test_data.json']

    def test_gets_all_players(self):
        response = self.client.get(reverse_with_args('nfl_rushing:index'))
        self.assertEqual(response.status_code, 200)

        players = response.context['current_page']
        player_names = list(players.values_list('name', flat=True))
        self.assertEquals(player_names, ['Person 1', 'Person 2', 'Person 3'])
    
    def test_filters(self):
        response = self.client.get(reverse_with_args('nfl_rushing:index', query_kwargs={ 'name_filter': '3' }))
        self.assertEqual(response.status_code, 200)

        players = response.context['current_page']
        player_names = list(players.values_list('name', flat=True))
        self.assertEquals(player_names, ['Person 3'])

    def test_filters_gets_all(self):
        response = self.client.get(reverse_with_args('nfl_rushing:index', query_kwargs={ 'name_filter': 'erson' }))
        self.assertEqual(response.status_code, 200)

        players = response.context['current_page']
        player_names = list(players.values_list('name', flat=True))

        self.assertEquals(player_names, ['Person 1', 'Person 2', 'Person 3'])
    
    def test_sort_total_rushing(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'sort_option': 'total_rushing_yards'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        players = response.context['current_page']
        player_names = list(players.values_list('name', flat=True))

        self.assertEquals(player_names, ['Person 3', 'Person 2', 'Person 1'])

    def test_sort_total_rushing_inc(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'sort_option': 'total_rushing_yards',
                'sort_direction': 'asc'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        players = response.context['current_page']
        player_names = list(players.values_list('name', flat=True))

        self.assertEquals(player_names, ['Person 1', 'Person 2', 'Person 3'])

    # explicitly set sort direction instead of using default
    def test_sort_desc(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'sort_option': 'total_rushing_yards',
                'sort_direction': 'desc'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        players = response.context['current_page']
        player_names = list(players.values_list('name', flat=True))

        self.assertEquals(player_names, ['Person 3', 'Person 2', 'Person 1'])

    def test_sort_longest_rush(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'sort_option': 'longest_rush'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        players = response.context['current_page']
        player_names = list(players.values_list('name', flat=True))

        self.assertEquals(player_names, ['Person 3', 'Person 1', 'Person 2'])

    def test_sort_longest_rush_inc(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'sort_option': 'longest_rush',
                'sort_direction': 'asc'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        players = response.context['current_page']
        player_names = list(players.values_list('name', flat=True))

        self.assertEquals(player_names, ['Person 2', 'Person 1', 'Person 3'])

    def test_sort_total_rushing_touchdowns(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'sort_option': 'total_rushing_touchdowns',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        players = response.context['current_page']
        player_names = list(players.values_list('name', flat=True))

        self.assertEquals(player_names, ['Person 1', 'Person 2', 'Person 3'])

    def test_sort_total_rushing_touchdowns_inc(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'sort_option': 'total_rushing_touchdowns',
                'sort_direction': 'asc',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        players = response.context['current_page']
        player_names = list(players.values_list('name', flat=True))

        self.assertEquals(player_names, ['Person 3', 'Person 2', 'Person 1'])

class TestIndexSortingLinks(TestCase):
    fixtures = ['test_data.json']

    def test_default(self):
        url = reverse_with_args('nfl_rushing:index')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        expected_sorting_links = {
            'total_rushing_yards': '?sort_option=total_rushing_yards&sort_direction=desc&',
            'longest_rush': '?sort_option=longest_rush&sort_direction=desc&',
            'total_rushing_touchdowns': '?sort_option=total_rushing_touchdowns&sort_direction=desc&'
        }

        self.assertDictEqual(response.context['sorting_links'], expected_sorting_links)

    def test_total_rushing_yards_selected(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'sort_option': 'total_rushing_yards',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        expected_sorting_links = {
            # sort_direction for the next time total_rushing_yards link is clicked should be inc
            'total_rushing_yards': '?sort_option=total_rushing_yards&sort_direction=asc&',
            'longest_rush': '?sort_option=longest_rush&sort_direction=desc&',
            'total_rushing_touchdowns': '?sort_option=total_rushing_touchdowns&sort_direction=desc&'
        }

        self.assertDictEqual(response.context['sorting_links'], expected_sorting_links)

    def test_total_rushing_yards_selected_with_inc(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'sort_option': 'total_rushing_yards',
                'sort_direction': 'asc'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        expected_sorting_links = {
            # sort_direction for the next time total_rushing_yards link is clicked should be desc
            'total_rushing_yards': '?sort_option=total_rushing_yards&sort_direction=desc&',
            'longest_rush': '?sort_option=longest_rush&sort_direction=desc&',
            'total_rushing_touchdowns': '?sort_option=total_rushing_touchdowns&sort_direction=desc&'
        }

        self.assertDictEqual(response.context['sorting_links'], expected_sorting_links)

class TestCsvLink(TestCase):
    fixtures = ['test_data.json']

    # creates csv link with the query args except for page, which is irrelevant
    def test_csv_link(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'sort_option': 'total_rushing_yards',
                'sort_direction': 'asc',
                'name_filter': 'bob',
                'page': 23,
            }
        )

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        expected_url = '/nfl-rushing/csv?sort_option=total_rushing_yards&sort_direction=asc&name_filter=bob'
        self.assertEqual(response.context['csv_link'], expected_url)

class TestPagination(TestCase):
    fixtures = ['test_pagination.json']

    def test_first_page_default(self):
        url = reverse_with_args('nfl_rushing:index')

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.context['current_page']), 10)
        self.assertEqual(response.context['current_page_number'], 1)
        self.assertEqual(response.context['has_other_pages'], True)
        self.assertEqual(response.context['previous_page'], None)
        self.assertEqual(response.context['next_page'], '?page=2&')

    def test_first_page(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'page': 1
            }
        )

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.context['current_page']), 10)
        self.assertEqual(response.context['current_page_number'], 1)
        self.assertEqual(response.context['has_other_pages'], True)
        self.assertEqual(response.context['previous_page'], None)
        self.assertEqual(response.context['next_page'], '?page=2&')

    def test_second_page(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'page': 2
            }
        )

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.context['current_page']), 2)
        self.assertEqual(response.context['current_page_number'],2)
        self.assertEqual(response.context['has_other_pages'], True)
        self.assertEqual(response.context['previous_page'], '?page=1&')
        self.assertEqual(response.context['next_page'], None)
    
    def test_non_existent_page_defaults_to_last_page(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'page': 100
            }
        )

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.context['current_page_number'], 2)

    def test_non_integer_page_defaults_to_first(self):
        url = reverse_with_args(
            'nfl_rushing:index',
            query_kwargs={
                'page': 'yahoo'
            }
        )

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.context['current_page_number'], 1)

class TestPaginationNoPages(TestCase):
    fixtures = ['test_data.json']

    def test_not_enough_data_for_multiple_pages(self):
        url = reverse_with_args('nfl_rushing:index')

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.context['current_page']), 3)
        self.assertEqual(response.context['current_page_number'], 1)
        self.assertEqual(response.context['has_other_pages'], False)
        self.assertEqual(response.context['previous_page'], None)
        self.assertEqual(response.context['next_page'], None)
