from .settings import *

# in-memory database
DATABASES['default'] = {'ENGINE': 'django.db.backends.sqlite3'}

# don't run any of the migrations -- including the data migration that adds rushing.json
MIGRATION_MODULES = {
    'auth': None,
    'contenttypes': None,
    'default': None,
    'sessions': None,

    'core': None,
    'profiles': None,
    'snippets': None,
    'scaffold_templates': None,

    'nfl_rushing': None,
}