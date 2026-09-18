import sys
import os

# Add parent directory to path so we can import from the project root
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, render_template, request, redirect, url_for
from flask_simple_geoip import SimpleGeoIP
from pyrebase import pyrebase

app = Flask(__name__, template_folder='../templates', static_folder='../static', static_url_path='/static')
app.secret_key = "super secret key"

config = {
  "apiKey": "AIzaSyBRGnBkPyTq2gDA6bb0hZ5j1qeOcwgWDYE",
  "authDomain": "soumya-f5929.firebaseapp.com",
  "projectId": "soumya-f5929",
  "storageBucket": "soumya-f5929.appspot.com",
  "messagingSenderId": "46421030000",
  "appId": "1:46421030000:web:2d8b68efbf670151a370b5",
  "measurementId": "G-W7WY4R16RH",
  "databaseURL" : ""
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/dashboard", methods=['POST'])
def dashboard():
    return render_template('dashboard.html')

@app.route("/logout", methods=['GET', 'POST'])
def logout():
    auth.current_user = None
    return redirect(url_for('login'))

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    unsuccessful = "User Already exists!"
    if request.method == 'POST':
        if request.form.get('id') == 'signup':
            email = request.form['name']
            password = request.form['pass']
            try:
                user = auth.create_user_with_email_and_password(email, password)
                return redirect(url_for('login'))
            except:
                return render_template('register.html', us=unsuccessful)
    return render_template('register.html')

@app.route("/login", methods=['GET', 'POST'])
def login():
    unsuccessful = "invalid credentials"
    if request.method == 'POST':
        if request.form.get('id') == 'login':
            email = request.form['name']
            password = request.form['pass']
            try:
                user = auth.sign_in_with_email_and_password(email, password)
                return render_template('dashboard.html')
            except:
                return render_template('login.html', us=unsuccessful)
        if request.form.get('id') == 'forgot':
            email = request.form['name']
            auth.send_password_reset_email(email)
            return redirect(url_for('login'))
    return render_template('login.html')

@app.route("/about")
def about():
    return render_template('about.html')

@app.route("/map")
def map_view():
    return render_template('map.html')

@app.route("/skinguide")
def skinguide():
    return render_template('skinguide.html')

if __name__ == "__main__":
    app.run(debug=False)
