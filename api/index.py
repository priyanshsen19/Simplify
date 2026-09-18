import sys
import os
import json

# Add parent directory to path so we can import from the project root
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, render_template, request, redirect, url_for
import firebase_admin
from firebase_admin import auth, credentials

app = Flask(__name__, template_folder='../templates', static_folder='../static', static_url_path='/static')
app.secret_key = "super secret key"

# Firebase config - for production, use environment variables
firebase_config = {
  "type": "service_account",
  "project_id": "soumya-f5929",
  "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID", ""),
  "private_key": os.getenv("FIREBASE_PRIVATE_KEY", "").replace('\\n', '\n'),
  "client_email": os.getenv("FIREBASE_CLIENT_EMAIL", ""),
  "client_id": os.getenv("FIREBASE_CLIENT_ID", ""),
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs"
}

try:
    cred = credentials.Certificate(firebase_config)
    firebase_admin.initialize_app(cred)
except Exception as e:
    # If service account not configured, app will still work for static routes
    pass

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
                user = auth.create_user(email=email, password=password)
                return redirect(url_for('login'))
            except Exception as e:
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
                # Firebase Admin SDK doesn't have built-in password verification
                # You'll need to implement custom token verification or use REST API
                return render_template('dashboard.html')
            except Exception as e:
                return render_template('login.html', us=unsuccessful)
        if request.form.get('id') == 'forgot':
            email = request.form['name']
            try:
                auth.generate_password_reset_link(email)
            except:
                pass
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
