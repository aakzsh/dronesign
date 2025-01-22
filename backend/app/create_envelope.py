from docusign_esign import ApiClient, EnvelopesApi, EnvelopeDefinition, Document, Signer, SignHere, Tabs, Recipients
import base64
from .pdf_generator import generate_mock_drone_pdf
from datetime import datetime
# from consts import pdf_file, demo_docs_path
# Configuration
client_id = '51d9a5db-91a9-4781-a070-c14b5a111907	'  # Integration key
base_path = 'https://demo.docusign.net/restapi'  # Use demo base path for sandbox
# oauth_token = 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCAmRgyXzjdSAgAgNk7QKI43UgCAJUTyCgfTN1LofASpiAkaMUVAAEAAAAYAAIAAAAFAAAAHQAAAA0AJAAAADUxZDlhNWRiLTkxYTktNDc4MS1hMDcwLWMxNGI1YTExMTkwNyIAJAAAADUxZDlhNWRiLTkxYTktNDc4MS1hMDcwLWMxNGI1YTExMTkwNzAAgMNgFl443Ug3ABQ2jLdVQipBjmShlubi5EQ.L2MGPgivbM5gdsc59QYpN3CdHQiSkoXPdx2ZlBiybp7o8ma062kXzule6BxzbOA1ouPkSmmrfTvfYy-114PP0DnjGVcmSRSdqpfjF0uhMn0-2qkOffuWFvc69X_KYu3yQw9mkXp3Q-W_yvfXwcKQyuNuN-D58JngJ8egSz5J8hDURQh8qmd1lW2ONr8GLcbPVBq8Rrr3LNWIc8BptPajzsi6dZHTHusCQBwH3lS_deY8K_ajXI9OthfO-71wPr0B9ThK06ghSZ5T6UJAi8wskDBmLilJTimAs-tUU-LBUw-pfBgrepcwhXQUnbwGjVvJDavZ_y9qVB5Bw725j-qAmQ'
# account_id = '743f01c6-40d5-43ae-b39e-ef38eb9a7f41'

# Document details
document_path = f"static/dummy.pdf"
document_name = 'Sample Document'
recipient_email = 'aakzshh@gmail.com'
recipient_name = 'John Doe'

# Function to send a document for signing
def send_document_for_signing(data, token):
    # Create API client
    api_client = ApiClient()
    api_client.host = base_path
    api_client.set_default_header("Authorization", f"Bearer {token}")
    filename = f"{str(datetime.now().timestamp)}-{token[0:10]}.pdf"
    generate_mock_drone_pdf(data, filename)
    # Read and encode the document
    with open(f"static/{filename}", "rb") as file:
        document_content = base64.b64encode(file.read()).decode("utf-8")

    # Create the document object
    document = Document(
        document_base64=document_content,
        name=document_name,
        file_extension="pdf",  # File extension
        document_id="1"
    )

    # Create a signer recipient
    signer = Signer(
        email=data["email"],
        name=data["ownerName"],
        recipient_id="1",
        routing_order="1"
    )

    # Add a signing tab (e.g., sign here)
    sign_here = SignHere(
        anchor_string="/sig1/",  # Replace with a tag in your document or use x/y positioning
        anchor_units="pixels",
        anchor_x_offset="10",
        anchor_y_offset="20"
    )

    # Assign the tab to the signer
    signer.tabs = Tabs(sign_here_tabs=[sign_here])

    # Create recipients object
    recipients = Recipients(signers=[signer])

    # Create the envelope definition
    envelope_definition = EnvelopeDefinition(
        email_subject=f"{data["droneModel"]} - Please review",
        documents=[document],
        recipients=recipients,
        status="sent"  # Set to "sent" to immediately send, or "created" to save as a draft
    )

    # Send the envelope
    envelopes_api = EnvelopesApi(api_client)
    results = envelopes_api.create_envelope(account_id=data["account_id"], envelope_definition=envelope_definition)
    print(f"Envelope has been sent! Envelope ID: {results.envelope_id}")
    return f"Envelope has been sent! Envelope ID: {results.envelope_id}"

# Call the function
# send_document_for_signing()
