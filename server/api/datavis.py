from project import initialize_from_task

pr = initialize_from_task('cord')
pr.launch()
def get_searchquery(query):
    filtered_df = pr.filter_dataset(query)
    query_answer = [{'id':d['paper_id'],
                     'Abstract':d['abstract'],
                     'Title':d['title'],
                     'Authors':d['authors'].replace('<br>','').split('.')} for ind, d in filtered_df.iterrows()]
    return query_answer

def get_answers(question):
    top_answers = pr.getanswers(question)
    answers_dict = [{'id':i,
                     'text':j} for i,j in enumerate(top_answers)]
    return answers_dict

def get_coordinates():
    key_map = {'embed_x':'x',
               'embed_y': 'y',
               'cluster': 'c',
               'title': 'title',
               'authors':'authors',
               'doi':'doi',
               'journal':'journal'}
    get_data = [list(pr.data[k]) for k in key_map]
    #return [{'x':i, 'y':j, 'c':c} for (i,j,c) in zip(list(pr.data['embed_x']), list(pr.data['embed_y']),
    #                                                 list(pr.data['cluster']))]
    return [{k: v for (k, v) in zip(key_map.values(), data)} for data in zip(*get_data)]


def get_edges():
    return pr.edges