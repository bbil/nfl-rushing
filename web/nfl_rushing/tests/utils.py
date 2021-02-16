from django.urls import reverse

from django.utils.http import urlencode

def reverse_with_args(viewname, query_kwargs=None):
    """
    Custom reverse to add a query string after the url
    Example usage:
    url = reverse_with_args('my_test_url', kwargs={'pk': object.id}, query_kwargs={'next': reverse('home')})
    """
    url = reverse(viewname)

    if query_kwargs:
        return u'%s?%s' % (url, urlencode(query_kwargs))

    return url