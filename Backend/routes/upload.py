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
query = """
From the provided resume PDF file extract details in a structured JSON format. 
The output should include three key sections: Candidate Overview, Key Details, and Important Questions. 
Candidate Overview: Summarize the candidate's profile, focusing on career aspirations or a professional summary. 
This should give a concise but comprehensive view of the candidate's professional identity and goals.
Key Details: This section should be divided into subsections for Name, Email, Phone Number, Education (with dates, grades and institutions), 
Experience (with job titles, companies, and duration), Skills (categorized if applicable), Projects (brief descriptions and roles played).
Each subsection should provide clear and precise information.
10 Important Questions: Based on the resume content, generate 10 relevant questions for an interview or further assessment. 
These questions should delve into the candidate's experience, skills, and accomplishments, aiming to elicit detailed responses about their professional 
journey and competencies.
Example Output:
Candidate overview:
The candidate, [NAME], is a [FIELD OF STUDY] student at [COLLEGE NAME]. With a GPA of [CGPA],
he has shown academic excellence, listed on the Dean's List for specific semesters. [NAME]'s experience includes a 
Developer Intern role at [COMPANY], working on [PROJECT]. He has skills in [SKILL SET] and experience with [TECHNOLOGIES]. 
Additionally, [NAME] has roles like Teaching Assistant and has received honors like [AWARDS].

Key details:
- Name: [NAME]
- Contact: [PHONE NUMBER], [EMAIL]
- Education: [DEGREE] in [FIELD] from [COLLEGE] ([DATES])
- Experience: [JOB TITLE] at [COMPANY] ([DURATION])
- Projects: [PROJECT NAMES]
- Skills: [SKILL SET]
- Honors: [AWARDS and HONORS]

Important questions:
1. [QUESTION 1]
2. [QUESTION 2]
...
10. [QUESTION 10]

return the answer in the following JSON format:
{
  "candidate_overview": "",
  "key_details": {
    "Name": "",
    "Contact": "",
    "Education": [
      {
        "Degree": "",
        "Institution": "",
        "Duration": ""
      },
      {
        "Degree": "",
        "Field": "",
        "Institution": "",
        "Percentage": "",
        "Duration": ""
      },
      {
        "Degree": "",
        "Field": "",
        "Institution": "",
        "CGPA": "",
        "Duration": ""
      }
    ],
    "Experience": [
      {
        "Job Title": "",
        "Company": "",
        "Duration": ""
      },
      {
        "Job Title": "",
        "Company": "",
        "Duration": ""
      },
      {
        "Job Title": "",
        "Company": "",
        "Duration": ""
      }
    ],
    "Projects": [
      {
        "Project Name": "",
        "Technologies": "",
        "Description": ""
      },
    ],
    "Skills": {},
    "Honors and Awards": [
      {
        "Award": "",
      },
    ]
  },
  "important_questions": [<Important Technical and experiential Questions>]
}
"""


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
        # query =
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