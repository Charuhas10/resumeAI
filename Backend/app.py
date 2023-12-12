# app.py
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Import and register route modules
from routes import hello, pdf, upload, uploadCV, uploadATS,builder

hello.init_app(app)
pdf.init_app(app)
upload.init_app(app)
uploadCV.init_app(app)
uploadATS.init_app(app)
builder.init_app(app)

if __name__ == "__main__":
    app.run(debug=True)
