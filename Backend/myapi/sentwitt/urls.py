from django.urls import path
from .views import current_user, UserList, test_model, tweets_query, trends_lookup, trends_tweets

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('test_model/', test_model),
    path('tweets_query/', tweets_query),
    path('trends_lookup/', trends_lookup),
    path('trends_tweets/', trends_tweets)
]