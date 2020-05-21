import csv  
import re
import itertools
import random

# emoji dictionnary
def load_dict_smileys():
    return {
        ":‑)":"smiley",
        ":-]":"smiley",
        ":-3":"smiley",
        ":->":"smiley",
        "8-)":"smiley",
        ":-}":"smiley",
        ":)":"smiley",
        ":]":"smiley",
        ":3":"smiley",
        ":>":"smiley",
        "8)":"smiley",
        ":}":"smiley",
        ":o)":"smiley",
        ":c)":"smiley",
        ":^)":"smiley",
        "=]":"smiley",
        "=)":"smiley",
        ":-))":"smiley",
        ":‑D":"smiley",
        "8‑D":"smiley",
        "x‑D":"smiley",
        "X‑D":"smiley",
        ":D":"smiley",
        "8D":"smiley",
        "xD":"smiley",
        "XD":"smiley",
        ":‑(":"sad",
        ":‑c":"sad",
        ":‑<":"sad",
        ":‑[":"sad",
        ":(":"sad",
        ":c":"sad",
        ":<":"sad",
        ":[":"sad",
        ":-||":"sad",
        ">:[":"sad",
        ":{":"sad",
        ":@":"sad",
        ">:(":"sad",
        ":'‑(":"sad",
        ":'(":"sad",
        ":‑P":"playful",
        "X‑P":"playful",
        "x‑p":"playful",
        ":‑p":"playful",
        ":‑Þ":"playful",
        ":‑þ":"playful",
        ":‑b":"playful",
        ":P":"playful",
        "XP":"playful",
        "xp":"playful",
        ":p":"playful",
        ":Þ":"playful",
        ":þ":"playful",
        ":b":"playful",
        "<3":"love"
        }

    # contractions dictionnary
def load_dict_contractions():
    return {
        "ain't":"is not",
        "amn't":"am not",
        "aren't":"are not",
        "can't":"cannot",
        "'cause":"because",
        "couldn't":"could not",
        "couldn't've":"could not have",
        "could've":"could have",
        "daren't":"dare not",
        "daresn't":"dare not",
        "dasn't":"dare not",
        "didn't":"did not",
        "doesn't":"does not",
        "don't":"do not",
        "e'er":"ever",
        "em":"them",
        "everyone's":"everyone is",
        "finna":"fixing to",
        "gimme":"give me",
        "gonna":"going to",
        "gon't":"go not",
        "gotta":"got to",
        "hadn't":"had not",
        "hasn't":"has not",
        "haven't":"have not",
        "he'd":"he would",
        "he'll":"he will",
        "he's":"he is",
        "he've":"he have",
        "how'd":"how would",
        "how'll":"how will",
        "how're":"how are",
        "how's":"how is",
        "I'd":"I would",
        "I'll":"I will",
        "I'm":"I am",
        "I'm'a":"I am about to",
        "I'm'o":"I am going to",
        "isn't":"is not",
        "it'd":"it would",
        "it'll":"it will",
        "it's":"it is",
        "I've":"I have",
        "kinda":"kind of",
        "let's":"let us",
        "mayn't":"may not",
        "may've":"may have",
        "mightn't":"might not",
        "might've":"might have",
        "mustn't":"must not",
        "mustn't've":"must not have",
        "must've":"must have",
        "needn't":"need not",
        "ne'er":"never",
        "o'":"of",
        "o'er":"over",
        "ol'":"old",
        "oughtn't":"ought not",
        "shalln't":"shall not",
        "shan't":"shall not",
        "she'd":"she would",
        "she'll":"she will",
        "she's":"she is",
        "shouldn't":"should not",
        "shouldn't've":"should not have",
        "should've":"should have",
        "somebody's":"somebody is",
        "someone's":"someone is",
        "something's":"something is",
        "that'd":"that would",
        "that'll":"that will",
        "that're":"that are",
        "that's":"that is",
        "there'd":"there would",
        "there'll":"there will",
        "there're":"there are",
        "there's":"there is",
        "these're":"these are",
        "they'd":"they would",
        "they'll":"they will",
        "they're":"they are",
        "they've":"they have",
        "this's":"this is",
        "those're":"those are",
        "'tis":"it is",
        "'twas":"it was",
        "wanna":"want to",
        "wasn't":"was not",
        "we'd":"we would",
        "we'd've":"we would have",
        "we'll":"we will",
        "we're":"we are",
        "weren't":"were not",
        "we've":"we have",
        "what'd":"what did",
        "what'll":"what will",
        "what're":"what are",
        "what's":"what is",
        "what've":"what have",
        "when's":"when is",
        "where'd":"where did",
        "where're":"where are",
        "where's":"where is",
        "where've":"where have",
        "which's":"which is",
        "who'd":"who would",
        "who'd've":"who would have",
        "who'll":"who will",
        "who're":"who are",
        "who's":"who is",
        "who've":"who have",
        "why'd":"why did",
        "why're":"why are",
        "why's":"why is",
        "won't":"will not",
        "wouldn't":"would not",
        "would've":"would have",
        "y'all":"you all",
        "you'd":"you would",
        "you'll":"you will",
        "you're":"you are",
        "you've":"you have",
        "Whatcha":"What are you",
        "luv":"love",
        "sux":"sucks",
        "commin":"comming"
        }   

#adding Header
clean = open('Classification/clean_tweets.csv',encoding="ISO-8859-1",mode ='w')
Header ='sentiment,tweet'
print(f'{Header}',file=clean)

#shuffle lines
lines = open('Classification/sentiment140.csv',encoding="ISO-8859-1",mode ='r').readlines()
random.shuffle(lines)
open('Classification/sentiment140.csv',encoding="ISO-8859-1",mode ='w').writelines(lines)

#start preprocessing
with open('Classification/sentiment140.csv', mode='r', encoding="ISO-8859-1") as csv_file: 
    csv_reader = csv.DictReader(csv_file, fieldnames=['target', 'id', 'date', 'flag', 'user', 'text'])

    for row in csv_reader:

        # we lower case the text
        text = row["text"]

        #Contractions
        CONTRACTIONS = load_dict_contractions()
        words_c = text.split()
        reformed_c = [CONTRACTIONS[word] if word in CONTRACTIONS else word for word in words_c]
        text = ' '.join(reformed_c)

        # Replace emoji by their sentiment
        SMILEY = load_dict_smileys()  
        words_e = text.split()
        reformed_e = [SMILEY[word] if word in SMILEY else word for word in words_e]
        text = ' '.join(reformed_e)

        # to lower key
        text = text.lower()
       
        #Remove usernames
        text = re.sub('@[^\s]+','', text)

        # replace hashtags by just words
        text = re.sub(r'#([^\s]+)', r'\1', text)

        # remove links
        text = re.sub('((www\.[^\s]+)|((https|http)?://[^\s]+))','',text)

        # remove ponctuations
        text = re.sub('[\.\,\!\?\:\;\-\_\=\+\*\#\(\)\'\"\^\{\}\@\[\]\%]', ' ', text)

        #Remove characters which repeat more than twice in a string
        text = re.sub('(.)\\1{2,}','\\1',text)

        #correct all multiple white spaces to a single white space
        text = re.sub('[\s]+', ' ', text)

        # Additional clean up : removing words less than 2 chars, and remove space at the beginning and teh end
        text = re.sub(r'\W*\b\w{1,2}\b', '', text)
        text = text.strip()

        #copy data in our file
        
        if(row["target"]=="0"):
            print(f'negative,{text}', file=clean)
        else:
           print(f'positive,{text}',file=clean)

clean.close()