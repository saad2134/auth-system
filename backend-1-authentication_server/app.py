from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import bcrypt


app = Flask(__name__)

# Enable CORS for all origins (or specify a specific domain)
CORS(app, resources={r"/*": {"origins": "*"}})

# Path to the database file
DATABASE_FOLDER = "database"
DATABASE_FILE = os.path.join(DATABASE_FOLDER, "users.json")

# Ensure the database folder and file exist
if not os.path.exists(DATABASE_FOLDER):
    os.makedirs(DATABASE_FOLDER)

if not os.path.exists(DATABASE_FILE):
    with open(DATABASE_FILE, "w") as f:
        json.dump([], f)


# Utility to load users from the database
def load_users():
    with open(DATABASE_FILE, "r") as f:
        return json.load(f)


# Utility to save users to the database
def save_users(users):
    with open(DATABASE_FILE, "w") as f:
        json.dump(users, f, indent=4)


# Route to handle user registration
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    full_name = data.get("full_name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    if not (full_name and email and phone and password):
        return jsonify({"status": "error", "message": "All fields are required."}), 400

    users = load_users()

    # Check if the email or phone already exists
    for user in users:
        if user["email"] == email or user["phone"] == phone:
            return jsonify({"status": "error", "message": "Email or phone already registered."}), 400

    # Add new user
    new_user = {
        "full_name": full_name,
        "email": email,
        "phone": phone,
        "password": hashed_password  # Store the received password here
    }
    users.append(new_user)
    save_users(users)

    return jsonify({"status": "success", "message": "User registered successfully."})



# Route to handle user login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    identifier = data.get("identifier")
    password = data.get("password")

    if not (identifier and password):
        return jsonify({"status": "error", "message": "Email/Phone and password are required."}), 400

    users = load_users()

    # Find the user by email or phone
    for user in users:
        if (user["email"] == identifier or user["phone"] == identifier):
            if bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
                return jsonify({"status": "success", "message": "Login successful."})

    return jsonify({"status": "error", "message": "Invalid credentials."}), 401


if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0", port=5000)
