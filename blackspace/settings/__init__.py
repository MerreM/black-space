from .settings import *
from .pipeline import *
from .logging import *
from .cache import *
from .local import *
if CACHING:
    MIDDLEWARE_CLASSES = ['django.middleware.cache.UpdateCacheMiddleware'] + MIDDLEWARE_CLASSES + ['django.middleware.cache.FetchFromCacheMiddleware']
