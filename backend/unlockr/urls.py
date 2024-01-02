from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

URL_BASE = "api/v1"

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{URL_BASE}/', include("accounts.urls")),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
