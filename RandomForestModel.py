import pickle
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix 
import pandas as pd
from sklearn.ensemble import RandomForestClassifier 
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score 
from micromlgen import port
import numpy as np
import csv
from firebase import firebase
import time
import sys
import  json

from statistics import mode
firebase = firebase.FirebaseApplication('https://gpstask-4cb92.firebaseio.com', authentication=None)
pkl_filename = "pickle_modelFINAL.pkl"
import os
DataBase =[]
loctionDict = {
        "0": {
            "x": 10,
            "y": 200
        },
        "1": {
            "x": 75,
            "y": 200
        },
        "2": {
            "x": 70,
            "y": 30
        },
        "3": {
            "x": 135,
            "y": 100
        },
        "4": {
            "x": 135,
            "y": 290
        },
        "5": {
            "x": 135,
            "y": 390
        },
        "6": {
            "x": 135,
            "y": 480
        },
        "7": {
            "x": 55,
            "y": 350
        },
    }




def find(name, path):
    for files in os.walk(path):
        if name in files:
            return name

def my_function():
    data = pd.read_excel(r"C:\Users\EG\Downloads\yarab.xlsx")
    X =  data.drop('Class', axis=1)
    y = data['Class']
    # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state=42) 

    classifier = RandomForestClassifier(n_estimators=100, 
                               bootstrap = True,
                               max_features = 'sqrt')
   
    classifier=RandomForestClassifier()  
    classifier=classifier.fit(X,y) 
    # y_pred = classifier.predict(X_test)
    # cm = confusion_matrix(y_test,y_pred)
    # print(cm)
    # accuracy = float(cm.diagonal().sum())/len(y_test)
    # print(accuracy)
    return(classifier)

def coordenates(classNo):
    newClass = classNo
    oldClass = DataBase[-1]


    # firebase.put('/','prediction',int(mode(finalPrediction)))


def prediction(classifier):   
    finalPrediction = []

    for j in range(2):
        predictions = []
        for i in range (3):
            StrengthOfWifi = []
            DataFromFireBase = firebase.get('/',None)
            for key,value in DataFromFireBase.items():
                StrengthOfWifi.append(value)    
            predictions.append(classifier.predict(np.array(StrengthOfWifi[:-1]).reshape(-1,1).transpose())[0])
            predict = mode(predictions)
        finalPrediction.append(predict)
    print(mode(finalPrediction))
    
    firebase.put('/','prediction',int(mode(finalPrediction)))
    
    return(finalPrediction)

def main():
    # for i in range(1000):
    if (find(pkl_filename,r"C:\Users\EG\Downloads")):
        with open(pkl_filename, 'rb') as file:
            classifier = pickle.load(file)
    else:
        classifier = my_function()
        with open(pkl_filename, 'wb') as file:
            pickle.dump(classifier, file)
    DataBase.append(prediction(classifier))
    return 0

if __name__ == '__main__':
    while True:
        main()

    












