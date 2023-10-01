# routes/hello.py
from flask import jsonify


def init_app(app):
    @app.route("/")
    def hello():
        return jsonify(message="Hello, World!")
