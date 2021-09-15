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

def write_subscription():
    with open ("subscriptions.csv", "a", newline="") as file:
        name = flask.request.args.get("name")
        start = flask.request.args.get("start")
        end = flask.request.args.get("end")
        renewal = flask.request.args.get("renewal")
        fee = flask.request.args.get("fee")
        writer = csv.writer(file, delimiter=",")
        writer.writerow([name, start, end, renewal, fee])

def write_subscription_txt():
    subscriptionsdb = open("subscriptions.txt","a")
    name_sub = flask.request.args.get("name")
    subscriptionsdb.write(name_sub)
    subscriptionsdb.close()

@app.route("/")
def homepage():
    return get_html("index")

@app.route("/add_subscription_page")
def show_subscription_add_page():
    return get_html("add_subscription")

@app.route("/show_subscriptions_page")
def show_subscriptions_page():
    return get_html("subscriptions")

@app.route("/add_subscription")
def submit_subscription():
    write_subscription()
    return get_html("subscriptions")



