from flask import Flask, request, jsonify
from typing import Dict, Text, Tuple

import os, requests, time, tempfile

app = Flask(__name__)

# Assuming URL and API_HEADERS are defined elsewhere
API_TOKEN = "5AXo2r4Gd1WC0Mq5MfNb5OeLM7XePM"
API_BASE_URL = "https://aihub.instabase.com/api/"
url = API_BASE_URL + "v2/aihub/converse/conversations"
API_HEADERS = {"Authorization": f"Bearer {API_TOKEN}"}


conversation_id = ""
document_id = []

print(conversation_id)
print(document_id)


# Function to create conversation and add files
def create_conversation_and_add_files(files: Dict[Text, bytes]) -> requests.Response:
    try:
        response = requests.post(url=url, headers=API_HEADERS, files=files)
        return response
    except requests.RequestException as e:
        print(f"Error in sending request: {e}")
        return None


# Function to get conversation status
def get_conversation_status(conversation_id: Text) -> Tuple[Dict, Text]:
    while True:
        response = requests.get(f"{url}/{conversation_id}", headers=API_HEADERS)
        if not response.ok:
            return None, f"Error getting conversation status: {response.text}"

        response_json = response.json()
        state = response_json.get("state")
        if not state:
            return (
                None,
                f"Error getting state from conversation metadata : {response_json}",
            )
        if state in ["COMPLETE", "FAILED"]:
            return response_json, None

        print("Documents still processing, please wait.")
        time.sleep(5)


# Function to ask a question
def ask_question(
    conversation_id: Text, query: Text, document_id: int, mode: Text = "default"
) -> Text:
    payload = dict(question=query, document_ids=document_id, mode=mode)
    response = requests.post(
        f"{url}/{conversation_id}/prompts", json=payload, headers=API_HEADERS
    )
    if not response.ok:
        return None, f"Error asking question: {response.text}"

    response_json = response.json()
    return response_json["answer"], None


def init_app(app):
    @app.route("/upload", methods=["POST"])
    def process_and_ask():
        if "file" not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

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
        # Replace 'YOUR_QUERY' and 'DOCUMENT_ID' with actual logic to determine them
        query = "Give the Name of the user"
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


# def init_app(app):
#     @app.route("/upload", methods=["POST"])
#     def process_and_ask():
#         if "file" not in request.files:
#             return jsonify({"error": "No file part in the request"}), 400
#         file = request.files["file"]
#         if file.filename == "":
#             return jsonify({"error": "No file selected"}), 400

#         # Save the file temporarily
#         filename = os.path.join(
#             "temporary_directory", file.filename
#         )  # Replace with your directory
#         file.save(filename)
#         folder_path = "temporary_directory"

#         # Read the file and create a conversation
#         files: Dict[Text, bytes] = {}
#         for file in os.listdir(folder_path):
#             complete_path = os.path.join(folder_path, file)
#             files[file] = open(complete_path, "rb")

#         response = create_conversation_and_add_files(files)
#         if response.ok:
#             resp_data = response.json()
#             conversation_id = resp_data.get("id")
#             if not conversation_id:
#                 print("Unable to create new conversation.")
#         # old logic
#         # with open(filename, "rb") as file_data:
#         #     files = {file.filename: file_data}
#         #     response = create_conversation_and_add_files(files)
#         #     if not response or not response.ok:
#         #         os.remove(filename)  # Clean up the file
#         #         return jsonify({"error": "Failed to create conversation"}), 500
#         #     conversation_id = response.json().get("id")
#         print(f"Conversation created with id: {conversation_id}")

#         # Get conversation status
#         response_json, err = get_conversation_status(conversation_id)
#         if err:
#             os.remove(filename)  # Clean up the file
#             print(f"Error occurred: {err}")
#             return jsonify({"error": err}), 500

#         # Ask a question
#         # Replace 'YOUR_QUERY' and 'DOCUMENT_ID' with actual logic to determine them
#         query = "Give the Name of the user"
#         document_id.append(response_json.get("documents")[0].get("id"))
#         print(f"Conversation id : {conversation_id}")
#         print(f"Document id: {document_id}")
#         print("worked till here")

#         answer, err = ask_question(conversation_id, query, document_id)
#         print("worked till here")
#         if err:
#             os.remove(filename)  # Clean up the file
#             print(
#                 f"Error getting an answer for document with id {document_id}, error: {err}"
#             )
#             return jsonify({"error": err}), 500

#         # Clean up the file after use
#         os.remove(filename)

#         print(f"Answer for document with id {document_id}: {answer}")
#         return jsonify({"answer": answer})
