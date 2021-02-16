from django import template

register = template.Library()

# Used to render a checkmark or x in the html
# can be used in template files
@register.simple_tag
def boolean_check(boolean_val):
    if boolean_val:
        return '&#10003;'
    else:
        return '&#10007;'