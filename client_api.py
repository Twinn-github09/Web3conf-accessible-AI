from flask import Flask, request, jsonify
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi
import re
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag
from nltk.corpus import stopwords, wordnet
import nltk
import subprocess
from google.cloud import speech_v1
from google.cloud import speech
from google.oauth2 import service_account
from google.cloud import storage
from pydub import AudioSegment
import soundfile as sf

client = Flask(__name__)
CORS(client)

nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')

stopwords_set = set(stopwords.words('english')).union({'The', 'us'})

def create_semantic_map(sentence):
    def get_wordnet_pos(treebank_tag):
        if treebank_tag.startswith('J'):
            return wordnet.ADJ
        elif treebank_tag.startswith('V'):
            return wordnet.VERB
        elif treebank_tag.startswith('N'):
            return wordnet.NOUN
        elif treebank_tag.startswith('R'):
            return wordnet.ADV
        else:
            return wordnet.NOUN

    sentence = re.sub(r'[^\w\s]', '', sentence)  # Remove punctuation
    sentence = re.sub(r"'", "'", sentence)      # Handle special quotes
    sentence = re.sub(r"\bI'm\b", "I am", sentence)  # Expand contractions

    words = sentence.split()
    lemmatizer = WordNetLemmatizer()
    pos_tags = pos_tag(words)
    lemmatized_words = [lemmatizer.lemmatize(w, pos=get_wordnet_pos(tag)) for w, tag in pos_tags]

    islsentence = " ".join(w.lower() for w in lemmatized_words if w.lower() not in stopwords_set)
    return islsentence


@client.route("/processVideo", methods=["POST"])
def processVideo():
    credentials = service_account.Credentials.from_service_account_file("credentials.json")
    self.client = speech_v1.SpeechClient(credentials=credentials)
    self.storage_client = storage.Client(credentials=credentials)
    self.bucket_name = "sign-language-12"
    data = request.json



@client.route("/getTranscript", methods=["POST"])
def getTranscript():
    data = request.json
    video_id = data.get("id")
    if not video_id:
        return jsonify({"error": "YouTube video ID missing"}), 400

    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['en', 'ml', 'ta', 'hi'])
        for segment in transcript:
            segment['text'] = create_semantic_map(segment['text'])

        return jsonify(transcript)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    client.run(host="0.0.0.0", port=5001, debug=True)
