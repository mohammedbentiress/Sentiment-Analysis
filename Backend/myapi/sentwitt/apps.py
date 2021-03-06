from django.apps import AppConfig
from tensorflow.keras.models import load_model


class SentwittConfig(AppConfig):
    name = 'sentwitt'
    model = 'C:/Users/ALPHA/Documents/GitHub/Sentiment-Analysis/Backend/myapi/sentwitt/model/model_LSTM_word2vec300.h5'
    word2vec_model =  load_model(model)
