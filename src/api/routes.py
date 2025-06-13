"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import select, or_, and_

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    if not data:
        return jsonify({"msg": "No data provided"}), 400
    
    required_fields = ["email", "username", "password"]
    if not all(field in data and data[field] for field in required_fields):
        return jsonify({"msg": "Missing required fields"}), 400
        
    email = data.get("email").lower()
    username = data.get("username").lower()
    hashed_password = generate_password_hash(data["password"])
    is_active = data.get("is_active", True)

    existing_user = db.session.execute(select(User).where(
        or_(User.username == username, User.email == email))).scalars().all()
    if existing_user:
        return jsonify({"msg": "A user with this username or email already exists"}), 409
    
    new_user = User(
        email = email,
        username = username,
        password = hashed_password,
        is_active = is_active
    )

    db.session.add(new_user)
    try:
        db.session.commit()
        return jsonify({"msg": "User created",
                        "New user": new_user.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Internal Server Error", "error": str(e)}), 500
    

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"msg": "No data provided"}), 400
    
    user = db.session.execute(select(User).where(User.email == data["email"].lower())).scalar_one_or_none()
    if not user:
        return jsonify({"msg": "incorrect or unregistered email"}), 404
    
    if not check_password_hash(user.password, data["password"]):
        return jsonify({"msg": "Incorrect password"}), 400
    
    try:
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"msg": "logged in successfully",
                        "token": access_token,
                        "user": user.serialize()}), 200
    except Exception as e:
        return jsonify({"msg": "Internal Server Error", "error": str(e)}), 500

