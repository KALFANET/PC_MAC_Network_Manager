const axios = require('axios');

const BASE_URL = "http://localhost:4000/api";

async function testAPI() {
    try {
        const response = await axios.get(`${BASE_URL}/devices`);
        console.log("✅ API Test Success:", response.data);
    } catch (error) {
        console.error("❌ API Test Failed:", error.message);
    }
}

testAPI();