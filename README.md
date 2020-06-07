# Sentiment-Analysis

Project : Analysing tweets sentiments into pos/neg in a specific topic

Creating a classifier to analyse sentiments extracted from tweets into 2 categories: negative / positive 
Tools : using keras with tensorflow backend to build our model.
This project is based on word embedding as feature extractor and neural networks for classification.

# Making a benchmark to choose between deep neural network and embedding which will provide us a higher accuracy and an optimized result

Classification models tested : Simple neural network / CNN: convolutional neural network / LSTM: Long Short Term Memory RNN
Embedding pre-trained models used : Glove / Word2vec / FastText

# Preprocessing Data

** Link to the dataset : https://www.kaggle.com/kazanova/sentiment140 **
Download the dataset ( heavy size to put on the repository - 1600000M tweets ), then run the preprocess.py file in DATA folder to get a cleaner version of the dataset ready to be trained on our classification models ( clean_tweets.csv)

# training models

Each model need to be trained and saved as well in form of weights ( the saved model.h5 needs to be inside the folder models -> the folder models need to be existed before running the classification files)

The pre-trained models : **Links

- Glove : Common Crawl (840B tokens, 2.2M vocab, cased, 300d vectors, 2.03 GB download): https://nlp.stanford.edu/projects/glove/

- Word2vec : Google News 300d Vectors : https://drive.google.com/file/d/0B7XkCwpI5KDYNlNUTTlSS21pQmM/edit

- FastText : Common Crawl & Wikepidia ( English version ) : https://fasttext.cc/docs/en/crawl-vectors.html







<<<<<<< HEAD
=======




>>>>>>> fc1b590dd59e7a6a9befd1d0af4657acaa2e8001


