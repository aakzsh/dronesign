const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 5050;

const { DOCUSIGN_INTEGRATION_KEY, DOCUSIGN_SECRET, DOCUSIGN_REDIRECT_URI } = process.env;


app.get('/', (req, res)=>{
    res.send("hehe")
})
// Step 1: Redirect to DocuSign for authorization
app.get("/auth", (req, res) => {
    const authorizationUrl = `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=${DOCUSIGN_INTEGRATION_KEY}&redirect_uri=${DOCUSIGN_REDIRECT_URI}`;
    res.redirect(authorizationUrl);
});

// Step 2: Handle the callback and exchange the authorization code for an access token
app.get("/callback", async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send("No code in query string");
    }

    try {
        const response = await axios.post("https://account-d.docusign.com/oauth/token", null, {
            params: {
                grant_type: "authorization_code",
                code,
                client_id: DOCUSIGN_INTEGRATION_KEY,
                client_secret: DOCUSIGN_SECRET,
                redirect_uri: DOCUSIGN_REDIRECT_URI,
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        // Store the access token securely, like in a session or a database
        const { access_token } = response.data;

        // Send the access token to the frontend
        res.send({ access_token });
    } catch (error) {
        console.error("Error fetching token:", error);
        res.status(500).send("Authentication failed");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
