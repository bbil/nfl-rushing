from django import template

register = template.Library()

@register.simple_tag
def boolean_check(boolean_val):
    if boolean_val:
        return '&#10003;'
    else:
        return '&#10007;'