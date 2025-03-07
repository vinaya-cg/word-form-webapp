from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from azure.storage.blob import BlobServiceClient
import os

app = FastAPI()

AZURE_STORAGE_CONNECTION_STRING = os.getenv("AZURE_STORAGE_CONNECTION_STRING")
CONTAINER_NAME = "wordformstorage"
WORD_FILENAME = "CTD_Form_V3.docx"
STORAGE_ACCOUNT_NAME = "yourstorageaccount"  # Define storage account name

blob_service_client = BlobServiceClient.from_connection_string(AZURE_STORAGE_CONNECTION_STRING)
blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=WORD_FILENAME)

@app.get("/get-word-url")
def get_word_url():
    try:
        url = blob_client.url
        return JSONResponse(content={"url": url})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/convert-to-pdf")
def convert_to_pdf():
    # Construct the PDF URL correctly
    pdf_url = f"https://{STORAGE_ACCOUNT_NAME}.blob.core.windows.net/{CONTAINER_NAME}/converted-{WORD_FILENAME.replace('.docx', '.pdf')}"
    
    return JSONResponse(content={"pdfUrl": pdf_url})
