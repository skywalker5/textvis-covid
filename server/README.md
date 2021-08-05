# CORD19-browser
Interactive Data Analysis for CORD-19 data set


## 1. Installation

### 1.1 (Optional) Create and activate a virtual environment

```
conda create -n cse6242project python=3.8.3
conda activate cse6242project
```

### 1.2 Download the repo and create runtime environment

### Windows

```
git clone https://github.gatech.edu/dchoi85/cse6242-team13-server.git
cd cse6242-team13-server
pip install -r windows.txt
```

### Linux & Mac

```
git clone https://github.gatech.edu/dchoi85/cse6242-team13-server.git
cd cse6242-team13-server
pip install -r linux.txt
```

### 1.3 Download the data and locate into data directory

Download [sample_10k_tsne_clustered_bibs.csv](https://drive.google.com/file/d/1BN8ftjA9hpar9Pns2Hd0uXQnAf0XTZpS/view?usp=sharing) and
locate sample_10k_tsne_clustered_bibs.csv into cse6242-team13-server/data.

## 2. Run



### 2.1 Start
```
python api/server.py
```
