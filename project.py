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

## Conditions
# all fields must be completed for the entry to be able to be submitted        
# end date must be after the start date
# renewal date must be after the start date
## Function calculates days from current day to renewal day            

@app.route("/")
def homepage():
    return get_html("index")

@app.route("/add_subscription")
def add():
    return get_html("add_subscription")

