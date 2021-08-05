import os
import pandas as pd
import numpy as np
import nltk
from nltk import word_tokenize, sent_tokenize
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import torch
from transformers import  AutoTokenizer,AutoModelForQuestionAnswering
DATASETS_PATH = 'data/'
MAX_FILTER = 100

def initialize_from_task(MODE="cord"):
    if MODE == "cord":
        dataset_path = "sample_10k_tsne_clustered_bibs.csv"
    project = Project(name=MODE, dataset_path=dataset_path)
    #project.launch()
    return project

class Project:
    def __init__(self, name=None, dataset_path=None):
        self.name = name
        self.dataset_path = dataset_path
        self.data = None

    def removepunc(self,my_str):
        punctuations = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''
        no_punct = ""
        for char in my_str:
            if char not in punctuations:
                no_punct = no_punct + char
        return no_punct

    def hasNumbers(self,inputString):
        return (bool(re.search(r'\d', inputString)))

    def ask(self, question, context):
        input_ids = self.tokenizer.encode(question, context)
        sep_index = input_ids.index(self.tokenizer.sep_token_id)

        num_seg_a = sep_index + 1

        num_seg_b = len(input_ids) - num_seg_a
        segment_ids = [0] * num_seg_a + [1] * num_seg_b
        assert len(segment_ids) == len(input_ids)
        tokens = self.tokenizer.convert_ids_to_tokens(input_ids)

        start_scores, end_scores = self.model(torch.tensor([input_ids]),
                                         token_type_ids=torch.tensor([
                                                                         segment_ids]))  # The segment IDs to differentiate question from answer_text
        answer_end = 0
        answer_start = torch.argmax(start_scores)
        answer_ends = torch.argsort(end_scores).numpy()[::-1]
        for i in answer_ends[0]:
            if answer_start <= i:
                answer_end = i

        answer = ' '.join(tokens[answer_start:answer_end + 1])
        answer = answer.replace(" ##", "").replace("[CLS] ", "")

        pack = [answer, answer_start, answer_end, torch.max(start_scores), end_scores[0][answer_end],
                (torch.max(start_scores) + end_scores[0][answer_end]), context]
        return pack

    def getanswers(self,question):
        recommendations = []
        processedQuestion = " ".join([self.snowstem.stem(i) for i in word_tokenize(self.removepunc(question)) if i not in self.stops])
        vector = self.vectorizer.transform([processedQuestion])
        questionSimilarityMatrix = cosine_similarity(vector, self.encArticles)
        ind = np.argmax(questionSimilarityMatrix[0])
        recommendations.append(word_tokenize(list(self.data.abstract)[ind]))

        questions = []
        contexts = []
        for bigcontext in recommendations:
            for i in range(int(len(bigcontext) / 60)):
                contexts.append(" ".join(bigcontext[i * 60:60 * (i + 1)]))
                questions.append(question)

        answers = []
        for question, context in zip(questions, contexts):
            result = self.ask(question, context)
            if len(result[0]) < 7 and "[CLS]" in result[0]:
                continue
            answers.append(result)
        answers = np.array(answers)
        top_answers = []
        for i in np.argsort(answers[:, 5])[-5:][::-1]:
            top_answers.append(answers[i,0])

        return top_answers

    def launch(self):
        ## load data
        data_file_path = os.path.join(DATASETS_PATH, self.dataset_path)
        if os.path.exists(data_file_path):
            df = pd.read_csv(data_file_path, index_col=0)
        else:
            print("No data exist!")
            exit(1)
        ## Prepare QA system
        nltk.download("punkt")
        nltk.download('stopwords')
        self.stops = stopwords.words("english")
        self.snowstem = SnowballStemmer("english")
        self.portstem = PorterStemmer()
        df = df.fillna('no data provided')
        # df["usetext"] = df.abstract.apply(lambda x: " ".join([self.snowstem.stem(i) for i in word_tokenize(self.removepunc(x.lower())) if not self.hasNumbers(i) if i not in self.stops]))
        self.tokenizer = AutoTokenizer.from_pretrained("ktrapeznikov/biobert_v1.1_pubmed_squad_v2")
        self.model = AutoModelForQuestionAnswering.from_pretrained("ktrapeznikov/biobert_v1.1_pubmed_squad_v2")

        ## Preprocess data
        self.vectorizer = TfidfVectorizer()
        self.encArticles = self.vectorizer.fit_transform(df.processed_text)

        ## Get citation graph
        df.bibs = df.bibs.apply(eval)
        df.bib_ids = df.bib_ids.apply(eval)

        edges=[]
        for ii in range(len(df.bib_ids)):
            s = list(df.paper_id)[ii]
            for t in list(df.bib_ids)[ii]:
                edges.append({'source':s, 'target':t})

        self.edges = edges
        self.data = df


    def filter_dataset(self, query):
        filtered_df = self.data[self.data["abstract"].str.contains(query, na=False, case=False)]
        return filtered_df.iloc[:MAX_FILTER]
