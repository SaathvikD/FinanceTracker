from .auth import auth_routes
from .expenses import expenses_routes
# Import other blueprints, e.g., loans, as needed

def register_blueprints(app):
    app.register_blueprint(auth_routes, url_prefix='/auth')
    app.register_blueprint(expenses_routes, url_prefix='/expenses')
    # Register additional blueprints here