from pdfminer.high_level import extract_text
import re
import os
from tempfile import NamedTemporaryFile

def pdf(file):
    if file.filename == "":
        return "Error: No selected file"  # Return an error message as a string

    # Save the file to a temporary location
    temp_file = NamedTemporaryFile(delete=False)
    file.save(temp_file.name)
    temp_file.close()

    # Extract text from the saved file
    text = extract_text(temp_file.name)

    # Clean up (delete) the temporary file
    os.unlink(temp_file.name)

    text = re.sub(r"\s+", " ", text)
    return text  # Return the extracted text string
