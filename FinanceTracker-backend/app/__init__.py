from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    CORS(app)
    jwt.init_app(app)

    with app.app_context():
        from .routes import routes  # Import the Blueprint
        app.register_blueprint(routes)  # Register the Blueprint
        db.create_all()  # Create database tables
        return app
