import pandas as pd
import numpy as np
import re
import nltk
from nltk.corpus import stopwords
import tensorflow as tf
configuration = tf.compat.v1.ConfigProto(device_count={"GPU": 0})
session = tf.compat.v1.Session(config=configuration)
from numpy import array
from numpy import asarray
from numpy import zeros
from keras.preprocessing.text import one_hot
from keras.preprocessing.sequence import pad_sequences
from keras.models import Sequential
from keras.layers.core import Activation, Dropout, Dense
from keras.layers import Flatten
from keras.layers import Conv1D
from keras.layers import GlobalMaxPooling1D
from keras.layers.embeddings import Embedding
from sklearn.model_selection import train_test_split
from keras.preprocessing.text import Tokenizer

import matplotlib as mp
import numpy as np

import matplotlib.pyplot as plt

tweets = pd.read_csv("Data/clean_tweets.csv",encoding="ISO-8859-1")

tweets.isnull().values.any()

'''count the number of negative / positive tweets in our dataset : 0 refers to negative while 1 refers to positive'''
# sns.countplot(x="sentiment",data=tweets)
# import matplotlib.pyplot as plt
# plt.show()

'''listing data into 2 columns : tweet and its sentiment and splitting it into test and train sets'''
#tweet listing
tweets['tweet']=tweets['tweet'].astype(str)
X = []
sentences = list(tweets['tweet'])
for sen in sentences:
    X.append(sen)

#sentiment listing
y = tweets['sentiment']
y = np.array(list(map(lambda x: 1 if x=="positive" else 0, y)))

#splitting data 
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)
sentences_train = X_train
#tokenization of data
tokenizer = Tokenizer(num_words=200000)
tokenizer.fit_on_texts(X_train)


X_train = tokenizer.texts_to_sequences(X_train)
X_test = tokenizer.texts_to_sequences(X_test)

# Adding 1 because of reserved 0 index
vocab_size = len(tokenizer.word_index) + 1
print('vocabulary size : ',vocab_size)

maxlen = 100

X_train = pad_sequences(X_train, padding='post', maxlen=maxlen)
X_test = pad_sequences(X_test, padding='post', maxlen=maxlen)

#print(X_train[200])
#print(sentences_train[200])

""" preparing the embedding layer by building our feature matrix using glove pre trained embedding model"""

""" create a dictionnay that will contain glove words as keys and their embedding list as values """

embeddings_dictionary = dict()

glove_file = open('Pre-trained Models/Glove/glove.6B.100d.txt', encoding="utf8")
for line in glove_file:
    records = line.split()
    word = records[0]
    vector_dimensions = asarray(records[1:], dtype='float32')
    embeddings_dictionary [word] = vector_dimensions
glove_file.close()

"""create the feature matrix with filtrinng the element with non zero vector """
count = 0
embedding_matrix = zeros((vocab_size, 100))
for word, index in tokenizer.word_index.items():
    embedding_vector = embeddings_dictionary.get(word)
    if embedding_vector is not None:
        embedding_matrix[index] = embedding_vector


nonzero_elements = np.count_nonzero(np.count_nonzero(embedding_matrix, axis=1))
print(nonzero_elements / vocab_size)
model = Sequential()
embedding_layer = Embedding(vocab_size, 100, weights=[embedding_matrix], input_length=maxlen , trainable=False)
model.add(embedding_layer)
model.add(Conv1D(128, 5, activation='relu'))
model.add(Flatten())
model.add(Dense(1, activation='sigmoid'))
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['acc'])

print(model.summary())

history = model.fit(X_train, y_train, batch_size=128, epochs=6, verbose=1, validation_split=0.2)
score = model.evaluate(X_test, y_test, verbose=1)
print("Test Score:", score[0])
print("Test Accuracy:", score[1])