import sys
import os
import requests

# Add parent directory to path so we can import from the project root
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__, template_folder='../templates', static_folder='../static', static_url_path='/static')
app.secret_key = "super secret key"

# Firebase Web API Key (from your Firebase Console)
FIREBASE_API_KEY = "AIzaSyBRGnBkPyTq2gDA6bb0hZ5j1qeOcwgWDYE"
FIREBASE_PROJECT_ID = "soumya-f5929"
FIREBASE_AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts"

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/dashboard", methods=['POST'])
def dashboard():
    return render_template('dashboard.html')

def firebase_signup(email, password):
    """Create a new Firebase user via REST API"""
    url = f"{FIREBASE_AUTH_URL}:signUp?key={FIREBASE_API_KEY}"
    payload = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }
    try:
        response = requests.post(url, json=payload)
        data = response.json()
        if response.status_code == 200:
            return {"success": True, "uid": data.get('localId')}
        else:
            error_msg = data.get('error', {}).get('message', 'Signup failed')
            return {"success": False, "error": error_msg}
    except Exception as e:
        return {"success": False, "error": str(e)}

def firebase_login(email, password):
    """Authenticate user via Firebase REST API"""
    url = f"{FIREBASE_AUTH_URL}:signInWithPassword?key={FIREBASE_API_KEY}"
    payload = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }
    try:
        response = requests.post(url, json=payload)
        data = response.json()
        if response.status_code == 200:
            return {
                "success": True,
                "uid": data.get('localId'),
                "email": data.get('email'),
                "token": data.get('idToken')
            }
        else:
            error_msg = data.get('error', {}).get('message', 'Invalid credentials')
            return {"success": False, "error": error_msg}
    except Exception as e:
        return {"success": False, "error": str(e)}

def firebase_password_reset(email):
    """Send password reset email"""
    url = f"{FIREBASE_AUTH_URL}:sendOobCode?key={FIREBASE_API_KEY}"
    payload = {
        "email": email,
        "requestType": "PASSWORD_RESET"
    }
    try:
        response = requests.post(url, json=payload)
        return response.status_code == 200
    except:
        return False

@app.route("/logout", methods=['GET', 'POST'])
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    error_msg = None
    if request.method == 'POST':
        if request.form.get('id') == 'signup':
            email = request.form.get('name', '').strip()
            password = request.form.get('pass', '').strip()

            if not email or not password:
                error_msg = "Email and password are required"
            else:
                result = firebase_signup(email, password)
                if result['success']:
                    session['user_email'] = email
                    session['user_id'] = result['uid']
                    return redirect(url_for('login'))
                else:
                    error_msg = result['error']

    return render_template('register.html', us=error_msg)

@app.route("/login", methods=['GET', 'POST'])
def login():
    error_msg = None
    if request.method == 'POST':
        action = request.form.get('id')
        email = request.form.get('name', '').strip()
        password = request.form.get('pass', '').strip()

        if action == 'login':
            if not email or not password:
                error_msg = "Email and password are required"
            else:
                result = firebase_login(email, password)
                if result['success']:
                    session['user_email'] = result['email']
                    session['user_id'] = result['uid']
                    session['user_token'] = result['token']
                    return render_template('dashboard.html')
                else:
                    error_msg = result['error']

        elif action == 'forgot':
            if not email:
                error_msg = "Please enter your email"
            else:
                if firebase_password_reset(email):
                    error_msg = "Password reset link sent to your email"
                else:
                    error_msg = "Error sending reset email"
            return render_template('login.html', us=error_msg)

    return render_template('login.html', us=error_msg)

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
