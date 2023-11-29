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
        Use the resume file of the user and this Job Description {text} to generate a Cover letter suitable for the role 
        for example:
        Dear Recruitment Team,
        I am writing to express my strong interest in the Software Engineering role at Microsoft. As a Bachelor
        of Technology candidate at Shiv Nadar University with a major in Computer Science Engineering, I am
        eager to bring my technical expertise and passion for innovation to a company that values growth,
        excellence, and diversity.
        Previously, I wasshortlisted for the Microsoft Engage Intern Program for my project on ASLR with hand
        gesture recognition, I have experienced Microsoft's inspiring culture firsthand. Although I did not get
        the opportunity to intern due to the role being filled, the technical and HR interviews I went through
        reinforced my aspiration to contribute to Microsoft's mission.
        My recent internship as a Front-End Developer Intern at Celebal Technologies equipped me with
        hands-on experience in creating responsive and user-friendly applications. I have a solid foundation in
        coding with languages such as Java, C/C++, and JavaScript, and a practical understanding of data
        structures, algorithms, and operating systems.
        I am drawn to the Microsoft Aspire Experience, as it aligns with my commitment to lifelong learning
        and professional development. I am enthusiastic about the opportunity to grow within Microsoft’s
        innovative environment, and I am confident that my background in creating impactful technology
        solutions will make a significant contribution to your team.
        Thank you for considering my application. I am looking forward to the opportunity to further discuss
        how my skills and experiences align with the goals of Microsoft.
        Warm regards,
        Sincerely,
        [name]
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
