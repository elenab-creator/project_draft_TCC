# Import modules that will be used
import flask
app = flask.Flask("project")

from datetime import date

import csv

# Function that will get the different html pages of the app
def get_html(page_name):
    html_file = open(page_name + ".html")
    content = html_file.read()
    html_file.close()
    return content          

class Subscription:
    def __init__(self, name, start, end, renewal, fee):
        self.name = name
        self.start = start
        self.end = end
        self.renewal = renewal
        self.fee = fee
    def write_to_file(self):
        with open ("subscriptions.csv", "a", newline="") as file:
            writer = csv.writer(file, delimiter=",")
            writer.writerow([self.name, self.start, self.end, self.renewal, self.fee])

def new_subscription():
    global subscription
    name = flask.request.args.get("name")
    start = flask.request.args.get("start")
    end = flask.request.args.get("end")
    renewal = flask.request.args.get("renewal")
    fee = flask.request.args.get("fee")
    subscription = Subscription(name, start, end, renewal, fee)
    subscription.write_to_file()

@app.route("/")
def homepage():
    return get_html("index")

@app.route("/add_subscription_page")
def show_subscription_add_page():
    return get_html("add_subscription")

@app.route("/add_subscription")
def submit_subscription():
    new_subscription()
    return get_html("add_subscription")

@app.route("/show_subscriptions") 
def subscriptions_page():
    rows = []
    html_page = get_html("subscriptions")
    with open('subscriptions.csv', 'r', newline='') as file:
        reader = csv.reader(file)
        for row in reader:
            rows.append(row)
            result = ""
            for row in rows:
                each_subscription = (str(row[0]) + "\t" + str(row[1]) + "\t" + str(row[2]) + "\t" + str(row[3]) + "\t" + str(row[4]))
                result += "<p>" + each_subscription + "<p>"
            return html_page.replace("$$SUBSCRIPTIONS$$", result)
            ### only returns first row!!!

