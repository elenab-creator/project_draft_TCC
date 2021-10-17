# Import modules that will be used
import flask
app = flask.Flask("project")

import csv

subscriptions = []

# Function that will read the content of each html file and return it in the browser
def get_html(page_name):
    html_file = open(page_name + ".html")
    content = html_file.read()
    html_file.close()
    return content          

# Defining class Subscription. Every added by the user subscription will be an instance of this class.
# The attributes of this class instance are the name, start date, end date, renewal date and fee for each subscription.
# The first method is a class constructor. 
# The second method writes the attributes of each object in a new line of a csv file.
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

# Function that will obtain the information provided by the user when a new subscription is added, 
# create a new subscription object of the class Object and
# write the object attributes in the csv file
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
    return flask.redirect("/show_subscriptions") 

@app.route("/show_subscriptions") 
def subscriptions_page():
    rows = []
    html_page = get_html("subscriptions")
    with open('subscriptions.csv', 'r', newline='') as file:
        reader = csv.reader(file)
        for row in reader:
            rows.append(row)
            lines = ("<table border=1> <tr> <td> Subscription Name </td> <td> Subscription Start Date </td> <td> Subscription End Date </td> <td> Subscription Renewal Date </td> <td> Subscription Fee </td> </tr>")
            for row in rows:
                each_subscription = ("<tr> <td>" + str(row[0]) + "</td> <td>" + str(row[1]) + "</td> <td>" + str(row[2]) + "</td> <td>" + str(row[3]) + "</td> <td>" + str(row[4]) + "</td> </tr>")
                subscription = Subscription(str(row[0]), str(row[1]), str(row[2]), str(row[3]), str(row[4]))
                subscriptions.append(subscription)
                lines += each_subscription
            result = lines + "</table>"
        return html_page.replace("$$SUBSCRIPTIONS$$", result)


