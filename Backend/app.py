from flask import Flask, jsonify, abort, request
from flask_cors import CORS

import re
from pdfminer.high_level import extract_text

import os
from tempfile import NamedTemporaryFile

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello():
    return jsonify(message="Hello, World!")


@app.route("/pdf", methods=["POST"])
def pdf():
    if "pdf" not in request.files:
        return jsonify(error="No file part"), 400
    file = request.files["pdf"]
    if file.filename == "":
        return jsonify(error="No selected file"), 400
    if file:
        # Save the file to a temporary location
        temp_file = NamedTemporaryFile(delete=False)
        file.save(temp_file.name)
        temp_file.close()  # Close the file

        # Extract text from the saved file
        text = extract_text(temp_file.name)

        # Clean up (delete) the temporary file
        os.unlink(temp_file.name)

        # text = re.sub(r"\n", "", text)
        text = re.sub(r"\s+", " ", text)
        return jsonify(text=text)


if __name__ == "__main__":
    app.run(debug=True)
