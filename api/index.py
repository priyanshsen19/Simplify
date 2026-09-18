import os
from datetime import timedelta
from functools import wraps

import requests

# Get the correct base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, render_template, request, redirect, url_for, session

# Create Flask app with absolute paths for Vercel compatibility
app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, 'templates'),
    static_folder=os.path.join(BASE_DIR, 'static'),
    static_url_path='/static'
)

# Every serverless instance must sign cookies with the same key or sessions
# break as requests land on different instances.
app.secret_key = os.environ.get("SECRET_KEY", "super secret key")
app.permanent_session_lifetime = timedelta(days=7)

# Firebase Web API Key (from your Firebase Console)
FIREBASE_API_KEY = "AIzaSyBRGnBkPyTq2gDA6bb0hZ5j1qeOcwgWDYE"
FIREBASE_PROJECT_ID = "soumya-f5929"
FIREBASE_AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts"

FIREBASE_ERRORS = {
    "EMAIL_EXISTS": "That email is already registered — try logging in instead.",
    "EMAIL_NOT_FOUND": "No account found with that email.",
    "INVALID_PASSWORD": "Incorrect email or password.",
    "INVALID_LOGIN_CREDENTIALS": "Incorrect email or password.",
    "INVALID_EMAIL": "That doesn't look like a valid email address.",
    "MISSING_PASSWORD": "Please enter your password.",
    "USER_DISABLED": "This account has been disabled.",
    "TOO_MANY_ATTEMPTS_TRY_LATER": "Too many attempts. Please wait a moment and try again.",
}


def friendly_error(raw):
    """Firebase returns codes like WEAK_PASSWORD : Password should be..."""
    code = raw.split(":")[0].strip()
    if code == "WEAK_PASSWORD":
        return "Password must be at least 6 characters."
    return FIREBASE_ERRORS.get(code, "Something went wrong. Please try again.")


def start_session(uid, email):
    session.permanent = True
    session["user_id"] = uid
    session["user_email"] = email


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get("user_id"):
            return redirect(url_for("login"))
        return view(*args, **kwargs)
    return wrapped


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/dashboard")
@login_required
def dashboard():
    return render_template('dashboard.html', user_email=session.get("user_email"))

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
    if session.get("user_id"):
        return redirect(url_for('dashboard'))

    error_msg = None
    if request.method == 'POST' and request.form.get('id') == 'signup':
        email = request.form.get('name', '').strip()
        password = request.form.get('pass', '').strip()

        if not email or not password:
            error_msg = "Email and password are required"
        else:
            result = firebase_signup(email, password)
            if result['success']:
                start_session(result['uid'], email)
                return redirect(url_for('dashboard'))
            error_msg = friendly_error(result['error'])

    return render_template('register.html', us=error_msg)

@app.route("/login", methods=['GET', 'POST'])
def login():
    if session.get("user_id") and request.method == 'GET':
        return redirect(url_for('dashboard'))

    message = None
    ok = False
    if request.method == 'POST':
        action = request.form.get('id')
        email = request.form.get('name', '').strip()
        password = request.form.get('pass', '').strip()

        if action == 'login':
            if not email or not password:
                message = "Email and password are required"
            else:
                result = firebase_login(email, password)
                if result['success']:
                    start_session(result['uid'], result['email'])
                    return redirect(url_for('dashboard'))
                message = friendly_error(result['error'])

        elif action == 'forgot':
            if not email:
                message = "Enter your email address first, then press Forgot password."
            else:
                # Same reply either way — a different one would reveal which
                # addresses have accounts.
                firebase_password_reset(email)
                message = "If that email has an account, a reset link is on its way."
                ok = True

    return render_template('login.html', us=message, ok=ok)

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
