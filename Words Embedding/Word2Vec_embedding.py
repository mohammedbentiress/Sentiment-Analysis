#%%
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
from keras.layers import GlobalMaxPooling1D
from keras.layers import Conv1D
from keras.layers.embeddings import Embedding
from sklearn.model_selection import train_test_split
from keras.preprocessing.text import Tokenizer

import gensim
from gensim.models import Word2Vec
from gensim.utils import simple_preprocess
from gensim.models.keyedvectors import KeyedVectors

import matplotlib.pyplot as plt
import matplotlib as mp
import numpy as np
plt.style.use('ggplot')

# function to visualize the loss and accuracy for the training and testing data based on the History callback. 
def plot_history(history):
    acc = history.history['acc']
    val_acc = history.history['val_acc']
    loss = history.history['loss']
    val_loss = history.history['val_loss']
    x = range(1, len(acc) + 1)

    plt.figure(figsize=(12, 5))
    plt.subplot(1, 2, 1)
    plt.plot(x, acc, 'b', label='Training acc')
    plt.plot(x, val_acc, 'r', label='Validation acc')
    plt.title('Training and validation accuracy')
    plt.legend()
    plt.subplot(1, 2, 2)
    plt.plot(x, loss, 'b', label='Training loss')
    plt.plot(x, val_loss, 'r', label='Validation loss')
    plt.title('Training and validation loss')
    plt.legend()
    plt.show()
# function to create the embbeding matrix from a pre trained model
def create_embedding_matrix(filepath, word_index, embedding_dim):
    vocab_size = len(word_index) + 1  # Adding again 1 because of reserved 0 index
    embedding_matrix = np.zeros((vocab_size, embedding_dim))

    with open(filepath,'r' ,encoding='utf-8') as f:
        for line in f:
            word, *vector = line.split()
            if word in word_index:
                idx = word_index[word] 
                embedding_matrix[idx] = np.array(
                    vector, dtype=np.float32)[:embedding_dim]

    return embedding_matrix

filepath = "Data/clean_tweets.csv"
df = pd.read_csv(filepath,encoding="ISO-8859-1")

df.isnull().values.any()

# tweet listing
df['tweet'] = df['tweet'].astype(str)
X = []
sentences = list(df['tweet'])
for sen in sentences:
    X.append(sen)

# sentiment listing
df['sentiment'] = df['sentiment'].map({'negative': 0, 'positive': 1})
y = df['sentiment'].values

# splitting data 
tweets_train, tweets_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)


# Tokenizer 
tokenizer = Tokenizer(num_words=200000)
tokenizer.fit_on_texts(tweets_train)


X_train = tokenizer.texts_to_sequences(tweets_train)
X_test = tokenizer.texts_to_sequences(tweets_test)

# Adding 1 because of reserved 0 index  
vocab_size = len(tokenizer.word_index) + 1 
print('vocabulary size : ',vocab_size)

maxlen = 100

X_train = pad_sequences(X_train, padding='post', maxlen=maxlen)
X_test = pad_sequences(X_test, padding='post', maxlen=maxlen)



embeddings_dictionary = dict()
word_vectors = KeyedVectors.load_word2vec_format('Pre-trained Models\Word2Vec\GoogleNews-vectors-negative300.bin', binary=True)


embedding_dim=300
embedding_matrix = np.zeros((vocab_size, embedding_dim))
for word, i in tokenizer.word_index.items():
    try:
        embedding_vector = word_vectors[word]
        if embedding_vector is not None:
            embedding_matrix[i] = embedding_vector

    except KeyError:
        embedding_matrix[i]=np.random.normal(0,np.sqrt(0.25),embedding_dim)
    


del(word_vectors)

nonzero_elements = np.count_nonzero(np.count_nonzero(embedding_matrix, axis=1))
print(nonzero_elements / vocab_size)

model = Sequential()
embedding_layer = Embedding(vocab_size, embedding_dim, weights=[embedding_matrix], input_length=maxlen , trainable=False)

model.add(embedding_layer)
model.add(Conv1D(128, 5, activation='relu'))
model.add(GlobalMaxPooling1D())
model.add(Dense(1, activation='sigmoid'))
model.compile(optimizer='adam',loss='binary_crossentropy',metrics=['acc'])
model.summary()

history = model.fit(X_train, y_train,batch_size=1000,epochs=6,verbose=1,validation_split=0.2)
loss, accuracy = model.evaluate(X_train, y_train, verbose=1)
print("Training Accuracy: {:.4f}".format(accuracy))
loss, accuracy = model.evaluate(X_test, y_test, verbose=1)
print("Testing Accuracy:  {:.4f}".format(accuracy))
plot_history(history)


# %%
