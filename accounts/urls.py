from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import EmailTokenObtainPairView, RegisterView, GetCurrentUser, CreateQrcodeView

urlpatterns = [
    path('accounts/register/', RegisterView.as_view(), name='token_obtain_pair'),
    path('accounts/token/obtain/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('accounts/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('accounts/get-user/basicauth/', GetCurrentUser.as_view(), name="get-user-basic-auth"),
    path('accounts/create_qrcode/', CreateQrcodeView.as_view(), name="create_qrcode"),
]