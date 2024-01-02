from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import EmailTokenObtainPairView, RegisterView, GetCurrentUser, GetUserFromToken

# urlpatterns = [
#     path('accounts/register/', RegisterView.as_view(), name='token_obtain_pair'),
#     path('accounts/token/obtain/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('accounts/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     path('accounts/user/obtain/', GetUserFromToken.as_view(), name="get-user"),
#     path('accounts/get-user/basicauth/', GetCurrentUser.as_view(), name="get-user-basic-auth"),
#     path('accounts/create_qrcode/', CreateQrcodeView.as_view(), name="create_qrcode"),
# ]

urlpatterns = [
    path('accounts/register/', RegisterView.as_view(), name='register'),
    path('accounts/token/obtain/', EmailTokenObtainPairView.as_view(), name='token_obtain'),
    path('accounts/user/', GetUserFromToken.as_view(), name='get_user'),
    path('accounts/user/basic/', GetCurrentUser.as_view(), name='get_current_user'), # basic auth
]
