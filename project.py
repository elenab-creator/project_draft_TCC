# Import modules that will be used
import flask
app = flask.Flask("project")

import datetime

import csv

# Function that will get the different html pages of the app
def get_html(page_name):
    html_file = open(page_name + ".html")
    content = html_file.read()
    html_file.close()
    return content          

def add_subscription():
    subscriptionsdb = open("subscriptions.txt","a") 
    subscriptionsdb.write("name")
    subscriptionsdb.close()

@app.route("/")
def homepage():
    return get_html("index")

@app.route("/add_subscription")
def add():
    add_subscription()
    return get_html("add_subscription")

