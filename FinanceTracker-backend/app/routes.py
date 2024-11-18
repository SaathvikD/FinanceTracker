from flask import Blueprint, request, jsonify
from . import db
from .models import User, Expense, Loan
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# Create a Blueprint
routes = Blueprint('routes', __name__)

@routes.route('/signup', methods=['POST'])
def signup():
    data = request.json
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = User(username=data['username'], email=data['email'], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully!'})

@routes.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': 'Invalid credentials!'}), 401
    #token = create_access_token(identity=user.id)
    token = create_access_token(identity=str(user.id))
    return jsonify({'token': token})

@routes.route('/expenses', methods=['POST'])
@jwt_required()
def add_expense():
    user_id = int(get_jwt_identity())
    data = request.json
    new_expense = Expense(user_id=user_id, description=data['description'],
                          amount=data['amount'], category=data['category'])
    db.session.add(new_expense)
    db.session.commit()
    return jsonify({'message': 'Expense added successfully!'})

@routes.route('/expenses', methods=['GET'])
@jwt_required()
def get_expenses():
    user_id = int(get_jwt_identity())
    expenses = Expense.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'description': exp.description,
        'amount': exp.amount,
        'category': exp.category,
        'date': exp.date
    } for exp in expenses])

@routes.route('/', methods=['GET'])
def home():
    return "Welcome to the Finance Tracker!"