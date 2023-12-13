from flask import Flask, request, jsonify
from utils.conversation_utils import (
    create_conversation_and_add_files,
    get_conversation_status,
    ask_question,
)

import os

app = Flask(__name__)

conversation_id = ""
document_id = []


def init_app(app):
    @app.route("/uploadCV", methods=["POST"])
    def generat_CV():
        if "file" not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        # Retrieve the text data
        text = request.form.get("text")
        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Save the file temporarily
        filename = os.path.join(
            "temporary_directory", file.filename
        )  # Replace with your directory
        file.save(filename)
        # folder_path = "temporary_directory"

        with open(filename, "rb") as file_data:
            files = {file.filename: file_data}
            response = create_conversation_and_add_files(files)
            if not response or not response.ok:
                os.remove(filename)  # Clean up the file
                return jsonify({"error": "Failed to create conversation"}), 500
            conversation_id = response.json().get("id")
        print(f"Conversation created with id: {conversation_id}")

        # Get conversation status
        response_json, err = get_conversation_status(conversation_id)
        if err:
            os.remove(filename)  # Clean up the file
            print(f"Error occurred: {err}")
            return jsonify({"error": err}), 500

        # Ask a question
        query = f"""
        Use the resume file of the user and this Job Description {text} to generate a Cover letter suitable for the role.
        """
        print(f"Query: {query}")
        document_id.append(response_json.get("documents")[0].get("id"))
        print(f"Conversation id : {conversation_id}")
        print(f"Document id: {document_id}")
        print("worked till here")

        answer, err = ask_question(conversation_id, query, document_id)
        print("worked till here")
        if err:
            os.remove(filename)  # Clean up the file
            print(
                f"Error getting an answer for document with id {document_id}, error: {err}"
            )
            return jsonify({"error": err}), 500

        # Clean up the file after use
        os.remove(filename)

        print(f"Answer for document with id {document_id}: {answer}")
        return jsonify({"answer": answer})
