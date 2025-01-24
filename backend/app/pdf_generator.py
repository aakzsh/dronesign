from fpdf import FPDF
import qrcode  
from datetime import datetime

def generate_mock_drone_pdf(data, filename="mock_drone_registration.pdf"):
    owner_name = data["ownerName"]
    buy_date = data["buyDate"]
    monetary_value = data["monetaryValue"]
    company = data["droneModel"]
    drone_nickname = data["droneNickname"]
    state = data["province"]
    city = data["city"]
    zipcode = data["zipcode"]

    
    qr_data = f"Owner: {owner_name}, Drone: {drone_nickname}, Model: {company}, Value: {monetary_value}"
    
    qr = qrcode.make(qr_data)
    qr_filename = f"static/qrcode_{owner_name}.png"
    qr.save(qr_filename)

    # Create PDF
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", style="B", size=16)

    # Dummy disclaimer
    pdf.cell(200, 10, "DUMMY MOCK PDF - FOR DEMO PURPOSES ONLY", ln=True, align='C')
    pdf.set_font("Arial", size=12)
    pdf.ln(10)

    # Organization Header
    pdf.cell(200, 10, "DroneSign - Your Trusted Drone Compliance Partner", ln=True, align='C')
    pdf.ln(10)

    # Owner Details
    pdf.set_font("Arial", style="B", size=14)
    pdf.cell(200, 10, "Owner Details", ln=True)
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, 
        f"Owner Name: {owner_name}\n"
        f"Drone Nickname: {drone_nickname}\n"
        f"Drone Model and Manufacturer: {company}\n"
        f"Purchase Date: {buy_date}\n"
        f"Monetary Value: {monetary_value}\n"
        f"Location: {city}, {state}, ZIP Code: {zipcode}\n"
    )
    pdf.ln(10)

    # QR Code Section
    pdf.set_font("Arial", style="B", size=14)
    pdf.cell(200, 10, "Scan QR Code for Registration Details", ln=True)
    pdf.image(qr_filename, x=70, y=pdf.get_y(), w=60)  # Position QR code
    pdf.ln(70)

    # Registration Importance
    pdf.set_font("Arial", style="B", size=14)
    pdf.cell(200, 10, "Why You Should Register Your Drone", ln=True)
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10,
        "It is important to register your drone with the FAA or similar government agencies to "
        "ensure compliance with local laws and regulations. Operating an unregistered drone may result "
        "in fines and other legal consequences.\n\n"
        "Registering your drone helps authorities track its ownership and ensure it is being used "
        "responsibly. Compliance not only protects your rights but also promotes safer skies for everyone."
    )
    pdf.ln(10)

    # Save the PDF
    pdf.output(f"static/{filename}")
    print(f"Mock PDF with QR code generated successfully: {filename}")

# Example usage
# generate_mock_drone_pdf({
#     "ownerName": "John Smith",
#     "buyDate": "2023-11-15",
#     "monetaryValue": "$12000",
#     "droneModel": "DJI Air 2S",
#     "droneNickname": "SkyKing",
#     "province": "California",
#     "city": "Los Angeles",
#     "zipcode": "90001"
# })
