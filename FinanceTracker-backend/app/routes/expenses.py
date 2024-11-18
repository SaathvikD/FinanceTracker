from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import Expense, db

expenses_routes = Blueprint('expenses_routes', __name__)

@expenses_routes.route('', methods=['POST'])
@jwt_required()
def add_expense():
    user_id = int(get_jwt_identity())
    data = request.json
    new_expense = Expense(user_id=user_id, description=data['description'],
                          amount=data['amount'], category=data['category'])
    db.session.add(new_expense)
    db.session.commit()
    return jsonify({'message': 'Expense added successfully!'})

@expenses_routes.route('', methods=['GET'])
@jwt_required()
def get_expenses():
    user_id = int(get_jwt_identity())
    expenses = Expense.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': exp.id,  # ID first
        'date': exp.date,  # Date second
        'description': exp.description,  # Description third
        'amount': exp.amount,  # Amount fourth
        'category': exp.category  # Category last
    } for exp in expenses])

@expenses_routes.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_expense(id):
    user_id = int(get_jwt_identity())
    expense = Expense.query.filter_by(id=id, user_id=user_id).first()
    if not expense:
        return jsonify({'message': 'Expense not found!'}), 404
    db.session.delete(expense)
    db.session.commit()
    return jsonify({'message': 'Expense deleted successfully!'})

@expenses_routes.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_expense(id):
    user_id = int(get_jwt_identity())
    expense = Expense.query.filter_by(id=id, user_id=user_id).first()
    if not expense:
        return jsonify({'message': 'Expense not found!'}), 404
    data = request.json
    expense.description = data.get('description', expense.description)
    expense.amount = data.get('amount', expense.amount)
    expense.category = data.get('category', expense.category)
    db.session.commit()
    return jsonify({'message': 'Expense updated successfully!'})

@expenses_routes.route('/filter', methods=['GET'])
@jwt_required()
def filter_expenses():
    user_id = int(get_jwt_identity())
    category = request.args.get('category')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    query = Expense.query.filter_by(user_id=user_id)
    if category:
        query = query.filter_by(category=category)
    if start_date and end_date:
        try:
            start_date = datetime.strptime(start_date, "%Y-%m-%d")
            end_date = datetime.strptime(end_date, "%Y-%m-%d")
            query = query.filter(Expense.date.between(start_date, end_date))
        except ValueError:
            return jsonify({'message': 'Invalid date format. Use YYYY-MM-DD.'}), 400

    expenses = query.all()
    return jsonify([{
        'id': exp.id,  # ID first
        'date': exp.date,  # Date second
        'description': exp.description,  # Description third
        'amount': exp.amount,  # Amount fourth
        'category': exp.category  # Category last
    } for exp in expenses])