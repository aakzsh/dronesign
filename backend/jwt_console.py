from os import path
import sys
import subprocess
from flask_cors import CORS
from datetime import datetime, timedelta
import requests

from docusign_esign import EnvelopesApi
from docusign_esign import ApiClient
from docusign_esign.client.api_exception import ApiException
from app.jwt_helpers import get_jwt_token, get_private_key
from app.eSignature.examples.eg002_signing_via_email import Eg002SigningViaEmailController
from app.jwt_config import DS_JWT
from flask import Flask, jsonify

# pip install DocuSign SDK
subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'docusign_esign'])

SCOPES = [
    "signature", "impersonation"
]

app = Flask(__name__)
CORS(app)


def get_consent_url():
    url_scopes = "+".join(SCOPES)

    # Construct consent URL
    redirect_uri = "https://developers.docusign.com/platform/auth/consent"
    consent_url = f"https://{DS_JWT['authorization_server']}/oauth/auth?response_type=code&" \
                  f"scope={url_scopes}&client_id={DS_JWT['ds_client_id']}&redirect_uri={redirect_uri}"

    return consent_url


def get_token(private_key, api_client):
    # Call request_jwt_user_token method
    token_response = get_jwt_token(private_key, SCOPES, DS_JWT["authorization_server"], DS_JWT["ds_client_id"],
                                   DS_JWT["ds_impersonated_user_id"])
    access_token = token_response.access_token
    # Save API account ID
    user_info = api_client.get_user_info(access_token)
    accounts = user_info.get_accounts()
    api_account_id = accounts[0].account_id
    base_path = accounts[0].base_uri + "/restapi"
    print(f"===== {user_info}")
    return {"access_token": access_token, "api_account_id": api_account_id, "base_path": base_path, "email": user_info.email, "name": user_info.name}


def get_args(api_account_id, access_token, base_path):
    signer_email = input("Please enter the signer's email address: ")
    signer_name = input("Please enter the signer's name: ")
    cc_email = input("Please enter the cc email address: ")
    cc_name = input("Please enter the cc name: ")

    envelope_args = {
        "signer_email": signer_email,
        "signer_name": signer_name,
        "cc_email": cc_email,
        "cc_name": cc_name,
        "status": "sent",
    }
    args = {
        "account_id": api_account_id,
        "base_path": base_path,
        "access_token": access_token,
        "envelope_args": envelope_args
    }

    return args


def run_example(private_key, api_client):
    jwt_values = get_token(private_key, api_client)
    args = get_args(jwt_values["api_account_id"], jwt_values["access_token"], jwt_values["base_path"])
    envelope_id = Eg002SigningViaEmailController.worker(args, DS_JWT["doc_docx"], DS_JWT["doc_pdf"])
    print("Your envelope has been sent.")
    print(envelope_id)


def main():
    api_client = ApiClient()
    api_client.set_base_path(DS_JWT["authorization_server"])
    api_client.set_oauth_host_name(DS_JWT["authorization_server"])

    private_key = get_private_key(DS_JWT["private_key_file"]).encode("ascii").decode("utf-8")

    try:
        run_example(private_key, api_client)
    except ApiException as err:
        body = err.body.decode('utf8')

        if "consent_required" in body:
            consent_url = get_consent_url()
            print("Open the following URL in your browser to grant consent to the application:")
            print(consent_url)
            consent_granted = input("Consent granted? Select one of the following: \n 1)Yes \n 2)No \n")
            if consent_granted == "1":
                run_example(private_key, api_client)
            else:
                sys.exit("Please grant consent")

@app.route('/')
def index():
    return "check"

@app.route('/login_new/<code>', methods=['GET'])
def login_new(code):
    # Get the code from query parameters
    if not code:
        return jsonify({"error": "Missing 'code' parameter"}), 400

    # Define the token API URL and headers
    url = 'https://account-d.docusign.com/oauth/token'
    headers = {
        'Authorization': 'BASIC xyz',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    data = {
        'grant_type': 'authorization_code',
        'code': code
    }

    try:
        # Make the POST request to the token API
        response = requests.post(url, data=data, headers=headers)
        response.raise_for_status()  # Raise an error for non-2xx status codes

        # Return the API response
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        # Handle any errors that occur during the request
        return jsonify({"error": str(e)}), 500

@app.route('/get_envelopes/<token>', methods=["GET"])
def get_envelopes(token):
        api_client = ApiClient()
        api_client.set_base_path(DS_JWT["authorization_server"])
        api_client.set_default_header(header_name="Authorization", header_value=f"Bearer {token}")
        envelope_api = EnvelopesApi(api_client)
        print(envelope_api.create_envelope(account_id="743f01c6-40d5-43ae-b39e-ef38eb9a7f41"))
        from_date = (datetime.utcnow() - timedelta(days=30)).strftime('%Y-%m-%d')
        # results = envelope_api.list_status_changes(account_id="28c81395-4c1f-4bdd-a1f0-12a6202468c5", from_date=from_date)
        # print(results)
        return "results"

@app.route('/getinfo/<token>')
def getinfo(token):
    api_client = ApiClient()
    user_info = api_client.get_user_info(access_token=token)
    print(user_info)
    return str(user_info)

if  __name__=="__main__":
    app.run(debug=True, host="0.0.0.0")