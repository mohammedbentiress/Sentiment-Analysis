import re
import csv
import json
import numpy as np
import pandas as pd
from numpy import array
from numpy import zeros
from numpy import asarray
import matplotlib.pyplot as plt
from tensorflow.keras import Sequential
from tensorflow.keras.models import save_model
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.text import one_hot
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.layers import Activation, Dropout, Dense, Flatten, GlobalMaxPool1D, Embedding, Conv1D, LSTM
from gensim.models import fasttext

dataset_file = 'Classification/DATA/clean_tweets.csv'
ft_file = 'Classification/FASTTEXT/cc.en.100.bin'
maxlen = 100

""" define functions for treatement """ 

# extracting  data from dataset tweet-sentiment
def load_dataset(filename):
    # read the dataset 
    tweets = pd.read_csv(filename, encoding="ISO-8859-1")

    # tweet listing
    text = []
    sentences = list(tweets['tweet'].astype(str))
    for sen in sentences:
        text.append(sen)

    # sentiment listing
    label = tweets['sentiment']
    label = np.array(list(map(lambda x: 1 if x=="positive" else 0, label)))
    
    return text,label



# load the embedding model 
def load_embedding_model(filename):
    # create the  embedding dictionnary
    model = fasttext.load_facebook_vectors(filename)
    return model




# create embedding weights
def create_embedding_matrix(embedding, vocabulary):
    # create the feature matrix with filtrinng the element with non zero vector
    count = 0
    vocab_size = len(vocabulary) + 1 
    embedding_mat = zeros((vocab_size, 100))
    for word, index in vocabulary.items():
        embedding_vector = embedding.get_vector(word)
        if embedding_vector is not None:
            count = count + 1
            embedding_mat[index] = embedding_vector
    
    # print some informations about our vocabulary
    print(" vocabulary size : number of unique words in the vocabulary ",vocab_size)
    print(" percentage of the vocabulary covered by the pretrained model : ",(count/vocab_size)*100)
    return embedding_mat

# create the sentiment classfier
def create_classifier(classification_model,embeddings):
    # add layers
    classification_model.add(embeddings)
    model.add(Conv1D(128, 5, activation='relu'))
    model.add(GlobalMaxPool1D())
    classification_model.add(Dense(1, activation='sigmoid'))
    
    # compile 
    classification_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['acc'])
    
    # print summary of the model
    print(classification_model.summary())
    return classification_model

# drawing plots for modeling accuracy and loss of the validation set
def draw_plots(model_history):
    
    # accuracy plot
    plt.plot(model_history.history['acc'])
    plt.plot(model_history.history['val_acc'])
    plt.title('model accuracy')
    plt.ylabel('accuracy')
    plt.xlabel('epoch')
    plt.legend(['train','valid'], loc='upper left')
    plt.show()

    # loss plot
    plt.plot(model_history.history['loss'])
    plt.plot(model_history.history['val_loss'])
    plt.title('model loss')
    plt.ylabel('loss')
    plt.xlabel('epoch')
    plt.legend(['train','valid'], loc='upper left')
    plt.show()

#save dictionnary
#def create_csv(file):
#    with open(file, 'w') as csvfile:
#        writer = csv.writer(csvfile)
#        for key in tokenizer.word_index.keys():
#            writer.writerow([key,tokenizer.word_index[key]])


""" main program : creating the model by using the functions above """ 

# get the tweets and their sentiment
X,y = load_dataset(dataset_file)

# splitting data 
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)
Sentences_train = X_train

# tokenization of data
tokenizer = Tokenizer(oov_token = True)
tokenizer.fit_on_texts(X_train)
X_train = tokenizer.texts_to_sequences(X_train)
X_test = tokenizer.texts_to_sequences(X_test)

# Padding sequences to have same size ( maxlen = 100 ) 
X_train = pad_sequences(X_train, padding='post', maxlen=maxlen)
X_test = pad_sequences(X_test, padding='post', maxlen=maxlen)

# load pre trained embedding and create weights for embedding layer
embeddings_model = load_embedding_model(ft_file)
embedding_matrix = create_embedding_matrix(embeddings_model, tokenizer.word_index)

# create embedding layer
embedding_layer = Embedding(len(tokenizer.word_index)+1, 100, weights=[embedding_matrix], input_length=maxlen, trainable=False)

# create the classifier : simple neural network 
model = Sequential()
model = create_classifier(model,embedding_layer)

# evaluating the model : training-80% and validation-20% sets 
history = model.fit(X_train, y_train, batch_size=1500, epochs=5, verbose=1, validation_split=0.2)

# evaluating the model : test set 20% from the whole dataset 
print("Evaluating the test set")
score = model.evaluate(X_test, y_test, verbose=1)

print("Test Score    :", score[0])
print("Test Accuracy :", score[1])

# Show plots
draw_plots(history) 

# predict
txt = ["awesome movie","terrible movie","that movie really sucks","i like that movie"]
txt = tokenizer.texts_to_sequences(txt)
txt = pad_sequences(txt, padding='post', maxlen=maxlen)
prediction = model.predict(txt)
print('\n prediction for \n',prediction[:,0])

# save model and weights
save_model(
    model,
    "Classification/FASTTEXT/models/model_CNN_ft100.h5",
    overwrite=True,
    include_optimizer=True
)

