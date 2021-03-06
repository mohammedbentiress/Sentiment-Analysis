from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
import numpy as np
import pickle
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.text import text_to_word_sequence
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
from django.views.decorators.csrf import csrf_exempt
import requests
import json
import tweepy
import re
import string
from .apps import SentwittConfig


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['POST'])
def test_model(request):
    # Define variables
    tweet=request.POST.get("tweet")
    
    tokenizer_file = 'C:/Users/ALPHA/Documents/GitHub/Sentiment-Analysis/Backend/myapi/sentwitt/model/tokenizer.pickle'
    maxlen = 100

    tokenizer = Tokenizer() 

    # Loading the tokenizer

    with open(tokenizer_file, 'rb') as handle:
        tokenizer = pickle.load(handle)


    # Load classification model 
    word2vec_model =  SentwittConfig.word2vec_model

    # Prediction
    tweet = [tweet]
    tweet = tokenizer.texts_to_sequences(tweet)
    tweet = pad_sequences(tweet, padding='post', maxlen=maxlen)
    prediction = word2vec_model.predict(tweet)
    response_data = {}
    response_data['result'] = prediction

    return Response(response_data,content_type="application/json",status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['POST'])
def tweets_query(request):
    #remove poncuations
    def remove_punctuation(text):
        for punctuation in string.punctuation:
            text = text.replace(punctuation, ' ')
        return text

    # extract search parameters
    query = request.POST.get("query")
    count = request.POST.get("count")
    result_type = request.POST.get("result_type")

    print(query)
    print(count)
    print(result_type)

    consumer_key = "L7B6ftF04mcZ7UsxYPsRhjl1y"
    consumer_secret = "nXdMEkDwGu5SazKuZUkjM2K4KaT85h4geMtcpcPGoclG48hipS"
    access_token = "1276685631893262337-Yw2HidggvDIttp8gZAKNlHRVsH9LsK"
    access_token_secret = "98Ahw9TdR0WISVxcwSbMlWeNG5ojNQt4C80HPzNDlzhZF"

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    
    api = tweepy.API(auth)
    tweets = []
    data = api.search(q=query,lang = 'en',count = count,result_type = result_type,tweet_mode='extended')
    for item in data:
        tweets.append(item.full_text)

    

    # Define variables
    tokenizer_file = 'C:/Users/ALPHA/Documents/GitHub/Sentiment-Analysis/Backend/myapi/sentwitt/model/tokenizer.pickle'
    maxlen = 100

    tokenizer = Tokenizer() 

    # Loading the tokenizer

    with open(tokenizer_file, 'rb') as handle:
        tokenizer = pickle.load(handle)


    # Load classification model 
    word2vec_model =  SentwittConfig.word2vec_model

    texts= []

    for text in tweets:
        # to lower key
        text = text.lower()
        #Remove usernames
        text = re.sub('@[^\s]+','', text)
        # replace hashtags by just words
        text = re.sub(r'#([^\s]+)', r'\1', text)
        # remove links
        text = re.sub('((www\.[^\s]+)|((https|http)?://[^\s]+))','',text)
        # remove ponctuations
        text = remove_punctuation(text)
        # remove numbers and digits
        text = re.sub(r'[0-9]+', '', text)
        # Remove characters which repeat more than twice in a string
        text = re.sub('(.)\\1{2,}','\\1',text)
        # correct all multiple white spaces to a single white space
        text = re.sub('[\s]+', ' ', text)
        # Additional clean up : removing words less than 2 chars, and remove space at the beginning and teh end
        text = re.sub(r'\W*\b\w{1,2}\b', '', text)
        text = text.strip()
        texts.append(text)

    texts = tokenizer.texts_to_sequences(texts)
    texts = pad_sequences(texts, padding='post', maxlen=maxlen)
    predictions = word2vec_model.predict(texts)
    response = {}
    responses = []
    for i in range(len(tweets)):
        response = {
            'tweet' : tweets[i],
            'prediction': predictions[i]
        }
        responses.append(response)


    return Response(responses,content_type="application/json",status=status.HTTP_200_OK)    

@csrf_exempt
@api_view(['POST'])
def trends_lookup(request):
    #remove poncuations
    def remove_punctuation(text):
        for punctuation in string.punctuation:
            text = text.replace(punctuation, ' ')
        return text

    # extract search parameters
    woeid = request.POST.get("woeid")

    consumer_key = "L7B6ftF04mcZ7UsxYPsRhjl1y"
    consumer_secret = "nXdMEkDwGu5SazKuZUkjM2K4KaT85h4geMtcpcPGoclG48hipS"
    access_token = "1276685631893262337-Yw2HidggvDIttp8gZAKNlHRVsH9LsK"
    access_token_secret = "98Ahw9TdR0WISVxcwSbMlWeNG5ojNQt4C80HPzNDlzhZF"

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    api = tweepy.API(auth)
    data = api.trends_available()
    data[0]
    trends = api.trends_place(woeid, exclude="hashtags")

    data = trends[0]
    trends = data['trends']
    names = [trend['name'] for trend in trends]

    responses = names
    

    return Response(responses,content_type="application/json",status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['POST'])
def trends_tweets(request):
    #remove poncuations
    def remove_punctuation(text):
        for punctuation in string.punctuation:
            text = text.replace(punctuation, ' ')
        return text

    # extract search parameters
    trend = request.POST.get("trend")

    consumer_key = "L7B6ftF04mcZ7UsxYPsRhjl1y"
    consumer_secret = "nXdMEkDwGu5SazKuZUkjM2K4KaT85h4geMtcpcPGoclG48hipS"
    access_token = "1276685631893262337-Yw2HidggvDIttp8gZAKNlHRVsH9LsK"
    access_token_secret = "98Ahw9TdR0WISVxcwSbMlWeNG5ojNQt4C80HPzNDlzhZF"

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    
    api = tweepy.API(auth)
    tweets = []
    data = api.search(q=trend,lang = 'en',tweet_mode='extended')
    for item in data:
        tweets.append(item.full_text)

    

    # Define variables
    tokenizer_file = 'C:/Users/ALPHA/Documents/GitHub/Sentiment-Analysis/Backend/myapi/sentwitt/model/tokenizer.pickle'
    maxlen = 100

    tokenizer = Tokenizer() 

    # Loading the tokenizer

    with open(tokenizer_file, 'rb') as handle:
        tokenizer = pickle.load(handle)


    # Load classification model 
    word2vec_model =  SentwittConfig.word2vec_model

    texts= []

    for text in tweets:
        # to lower key
        text = text.lower()
        #Remove usernames
        text = re.sub('@[^\s]+','', text)
        # replace hashtags by just words
        text = re.sub(r'#([^\s]+)', r'\1', text)
        # remove links
        text = re.sub('((www\.[^\s]+)|((https|http)?://[^\s]+))','',text)
        # remove ponctuations
        text = remove_punctuation(text)
        # remove numbers and digits
        text = re.sub(r'[0-9]+', '', text)
        # Remove characters which repeat more than twice in a string
        text = re.sub('(.)\\1{2,}','\\1',text)
        # correct all multiple white spaces to a single white space
        text = re.sub('[\s]+', ' ', text)
        # Additional clean up : removing words less than 2 chars, and remove space at the beginning and teh end
        text = re.sub(r'\W*\b\w{1,2}\b', '', text)
        text = text.strip()
        texts.append(text)

    texts = tokenizer.texts_to_sequences(texts)
    texts = pad_sequences(texts, padding='post', maxlen=maxlen)
    predictions = word2vec_model.predict(texts)
    response = {}
    responses = []
    for i in range(len(tweets)):
        response = {
            'tweet' : tweets[i],
            'prediction': predictions[i]
        }
        responses.append(response)

    

    return Response(responses,content_type="application/json",status=status.HTTP_200_OK)