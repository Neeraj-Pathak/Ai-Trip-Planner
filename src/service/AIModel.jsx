import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const API_KEY = 'AIzaSyDNvNEaMlWua3YMzgwkdztB2F_-8Z5mH6o';

app.post('/api/generate-trip', async (req, res) => {
  const { destination, days, budget, people } = req.body;

  try {
    const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
      contents: [
        {
          parts: [
            {
              text: `Plan a ${days}-day ${budget} trip for ${people} to ${destination}. Include popular places, local experiences, and travel tips.`
            }
          ]
        }
      ]
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error calling Gemini API:', error.message);
    res.status(500).json({ error: 'Failed to generate trip plan' });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
