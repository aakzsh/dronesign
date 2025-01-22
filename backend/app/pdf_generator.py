from fpdf import FPDF
import random
from datetime import datetime

def generate_mock_drone_pdf(data, filename="mock_drone_registration.pdf"):
    # Random details
    # owner_name = random.choice(["John Doe", "Alice Smith", "Robert Johnson", "Emily Davis"])
    # buy_date = datetime.now().strftime("%Y-%m-%d")
    # monetary_value = f"${random.randint(500, 5000)}"
    # drone_model = random.choice(["DJI Phantom 4", "Parrot Anafi", "Skydio 2", "Autel Evo Lite"])
    # company = random.choice(["DJI", "Parrot", "Skydio", "Autel Robotics"])
    # drone_nickname = random.choice(["SkyKing", "EagleEye", "AirRider", "CloudWalker"])
    # state = random.choice(["California", "Texas", "Florida", "New York", "Illinois"])
    # city = random.choice(["Los Angeles", "Houston", "Miami", "New York City", "Chicago"])
    # zipcode = random.randint(10000, 99999)
    owner_name = data["ownerName"]
    buy_date = data["buyDate"]
    monetary_value = data["monetaryValue"]
    company = data["droneModel"]
    drone_nickname = data["droneNickname"]
    state = data["province"]
    city = data["city"]
    zipcode = data["zipcode"]
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

    # Registration Importance
    pdf.set_font("Arial", style="B", size=14)
    pdf.cell(200, 10, "Why You Should Register Your Drone", ln=True)
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10,
        "It is important to register your drone with the FAA or similar government agencies to "
        "ensure compliance with local laws and regulations. Operating an unregistered drone may result "
        "in fines and other legal consequences.\n\n"
        "Civilian drones have become increasingly popular for photography, delivery services, "
        "agriculture, and recreational use. However, the rapid growth in drone usage has led to stricter "
        "government policies to ensure airspace safety and privacy concerns.\n\n"
        "Registering your drone helps authorities track its ownership and ensure it is being used "
        "responsibly. Compliance not only protects your rights but also promotes safer skies for everyone.\n\n"
        "DroneSign makes it easier than ever to stay compliant and avoid unnecessary legal troubles."
    )
    pdf.ln(10)

    # Save the PDF
    pdf.output(f"static/{filename}")
    print(f"Mock PDF generated successfully: {filename}")

# Example usage
# generate_mock_drone_pdf({
#     "ownerName": "John Smith",
#     "buyDate": "2023-11-15",
#     "monetaryValue": 12000,
#     "droneModel": "DJI Air 2S",
#     "droneNickname": "SkyKing",
#     "province": "California",
#     "city": "Los Angeles",
#     "zipcode": "90001"
# })
