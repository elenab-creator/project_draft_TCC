# Import modules that will be used
import flask
from flask import request, make_response

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
    def __init__(self, name, start, end, renewal, fee, username):
        self.name = name
        self.start = start
        self.end = end
        self.renewal = renewal
        self.fee = fee
        self.username = username
    def write_to_file(self):
        with open ("subscriptions.csv", "a", newline="") as file:
            writer = csv.writer(file, delimiter=",")
            writer.writerow([self.name, self.start, self.end, self.renewal, self.fee, self.username])

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
    username = request.cookies.get("userID")
    subscription = Subscription(name, start, end, renewal, fee, username)
    subscription.write_to_file()

@app.route("/")
def homepage():
    print(request.cookies.get('userID'))
    ## The first time that user A logs in and uses the app there are no problems. After closing and reopening 
    ## the browser and although his username remains saved in local storage and in cookies, the "raw" homepage (index) returns. 
    ## Which makes sense as this is the index route. Tried the following if statement, trying to say get the 
    ## "raw" index page if there is no value assigned to the userID cookie, but it is clearly wrong.
    ## How can I fix this? (It would be so much easier if I could control for lenght of local storage)
    ## 
    if request.cookies.get('userID') == None:
        print(request.cookies.get('userID'))
        return get_html("index")
    else:
        return flask.redirect("/menu")

@app.route("/menu")
def menu_page():
    return get_html("menu")

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
                if str(row[5]) == request.cookies.get('userID'):
                    each_subscription = ("<tr> <td>" + str(row[0]) + "</td> <td>" + str(row[1]) + "</td> <td>" + str(row[2]) + "</td> <td>" + str(row[3]) + "</td> <td>" + str(row[4]) + "</td> </tr>")
                    lines += each_subscription
                    #subscription = Subscription(str(row[0]), str(row[1]), str(row[2]), str(row[3]), str(row[4]), str(row[5]))
                    #subscriptions.append(subscription)   
                result = lines + "</table>"
        return html_page.replace("$$SUBSCRIPTIONS$$", result)

@app.route("/get_username", methods = ['POST', 'GET'])
def get_username():
    username = request.form["name"]
    resp = make_response(get_html("menu"))
    resp.set_cookie('userID', username, max_age=60*60*24*365*100)
    return resp

