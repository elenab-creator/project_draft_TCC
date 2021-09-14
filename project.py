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
def add_subscription():
    class Subscription:
        number_of_subscriptions = 0
        def __init__(self):
            self.name = flask.request.args.get("name")
            self.start = flask.request.args.get("start")
            self.end = flask.request.args.get("end")
            self.renewal = flask.request.args.get("renewal")
            self.fee = flask.request.args.get("fee")
            Subscription.number_of_subscriptions =+ 1
            with open ("subscriptions.csv", "w", newline="") as file:
                writer = csv.writer(file)
                if Subscription.number_of_subscriptions == 0:
                    writer.writerow(["Subscription Name", "Subscription Start Date", "Subscription End Date", "Subscription Renewal Date", "Subscription Fee"])
                    writer.writerow([self.name, self.start, self.end, self.renewal, self.fee])
                else:
                    writer.writerow([self.name, self.start, self.end, self.renewal, self.fee])              

@app.route("/")
def homepage():
    return get_html("index")

@app.route("/add_subscription")
def add():
    add_subscription()
    return get_html("add_subscription")

