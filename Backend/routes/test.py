import os
import time
from typing import Dict, Text, Tuple
import requests
from requests import Response

API_TOKEN = "5AXo2r4Gd1WC0Mq5MfNb5OeLM7XePM"

API_BASE_URL = "https://aihub.instabase.com/api/"
url = API_BASE_URL + "v2/aihub/converse/conversations"
API_HEADERS = {"Authorization": f"Bearer {API_TOKEN}"}

#    Creates Converse conversation, uploads and processes files
def create_conversation_and_add_files(files: Dict[Text, bytes]) -> Response:
    response = requests.post(url=url, headers=API_HEADERS, files=files)
    return response


local_folder_path = "Path"
# file path to input folder, such as '/Users/vasudua/Documents/Sample docs'
# folder must contain at least one valid file

files: Dict[Text, bytes] = {}
for file in os.listdir(local_folder_path):
    complete_path = os.path.join(local_folder_path, file)
    files[file] = open(complete_path, "rb")

response = create_conversation_and_add_files(files)
if response.ok:
    resp_data = response.json()
    conversation_id = resp_data.get("id")
    if not conversation_id:
        print("Unable to create new conversation.")

    print(f"Response from create conversation : {resp_data}")


def get_conversation_status(conversation_id: Text) -> Tuple[Dict, Text]:
    while True:
        response = requests.get(f"{url}/{conversation_id}", headers=API_HEADERS)
        if not response.ok:
            return None, f"Error getting conversation metadata : {response.text}"

        response_json = response.json()
        state = response_json.get("state")
        if not state:
            return (
                None,
                f"Error getting state from conversation metadata : {response_json}",
            )

        # If state of processing the documents is either COMPLETE or FAILED
        # stop polling and return.
        if state in ["COMPLETE", "FAILED"]:
            return response_json, None

        print("Documents still processing, please wait!")

        # If it is RUNNING, the script waits for 5 seconds before the next poll.
        time.sleep(5)


# Get the status of conversation
conversation_id = "some_id_returned by function1"
response_json, err = get_conversation_status(conversation_id=conversation_id)
if err:
    print(f"Error occurred: {err}")

print(f"Conversation status : {response_json}")


# The IBLLM model currently supports querying on one document at a time.
def ask_question(
    conversation_id: Text,
    query: Text,
    document_id: int,
    # default/advanced
    mode: Text = "default",
) -> Text:
    payload = dict(question=query, document_ids=document_id, mode=mode)
    response = requests.post(
        f"{url}/{conversation_id}/prompts", json=payload, headers=API_HEADERS
    )
    if not response.ok:
        return None, f"Error occurred while asking a question : {response.text}"

    response_json = response.json()
    return response_json["answer"], None


conversation_id = "some_id_returned by function1"
document_id = [1234]  # getting document id from 2nd function
answer, err = ask_question(
    conversation_id,
    "Job Description: What youll do Design and Development of one or more above mentioned components in the platform Be responsible for full lifecycle of the project from user story to design, development, testing, documentation and maintenance. Design highly available and scalable services. Design cloud vendor neutral solutions. Design low latency and high performance solutions Secure and standards compliant development Programming in Java, Ruby, golang, spring Framework Validating latency, throughput and availability of your solutions. What you need to succeed B.Tech and/or M. Tech Computer Science with excellent academic record Demonstrable Experience in designing, building, evolving and working with large scale, complex software projects. Self-motivated, with ability and interest in learning new technologies and adapting quickly to new requirements and environments Demonstrable Experience in developing scalable Cloud based services on either/both AWS and Azure Strong Programming and Problem solving skills Good written and verbal communication skills Good Team player Experience with Agile development practices Prior experience on popular Open Source software such as MySQL, Redis, Cassandra, Kafka will be a bonus. Based on this description and extract data from resume and give a match score out of 100",
    document_id=document_id,
)
if err:
    print(f"Error getting an answer for document with id {document_id}, error: {err}")

print(f"Answer for document with id {document_id}: {answer}")
