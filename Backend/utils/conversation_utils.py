import requests, time
from typing import Dict, Text, Tuple

API_TOKEN = "5AXo2r4Gd1WC0Mq5MfNb5OeLM7XePM"
API_BASE_URL = "https://aihub.instabase.com/api/"
url = API_BASE_URL + "v2/aihub/converse/conversations"
API_HEADERS = {"Authorization": f"Bearer {API_TOKEN}"}


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
