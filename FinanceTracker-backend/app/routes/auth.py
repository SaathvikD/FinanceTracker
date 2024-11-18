from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from ..models import User, db

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/signup', methods=['POST'])
def signup():
    data = request.json

    # Validate request data
    if not all([data.get('username'), data.get('email'), data.get('password')]):
        return jsonify({'message': 'Missing username, email, or password!'}), 400

    # Check if email or username already exists
    existing_email = User.query.filter_by(email=data['email']).first()
    existing_username = User.query.filter_by(username=data['username']).first()
    if existing_email:
        return jsonify({'message': 'Email already registered!'}), 400
    if existing_username:
        return jsonify({'message': 'Username already taken!'}), 400

    # Hash the password and create a new user
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = User(username=data['username'], email=data['email'], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully!'}), 201

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.json

    # Validate request data
    if not all([data.get('username'), data.get('password')]):
        return jsonify({'message': 'Missing username or password!'}), 400

    user = User.query.filter_by(username=data['username']).first()

    # Check if user exists and password matches
    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': 'Invalid credentials!'}), 401

    # Generate JWT token
    token = create_access_token(identity=str(user.id))
    return jsonify({'token': token}), 200