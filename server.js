// Import the necessary libraries and dependencies
const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const axios = require('axios');


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-tYcyOBrEV4ugEJyIp3sGT3aQ",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

// Create an instance of the Express app
const app = express();

// Set up the server to parse JSON bodies and handle CORS
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Replace YOUR_API_KEY with your actual API key
// Define the routes for the server
app.post('/api/generate-short-film', async (req, res) => {
  // Get the title, genre, and description from the request body
  const { title, genre, description, parameters } = req.body;

  // Use the openai.generate method to generate text using the OpenAI API
  try {
    // Send request to get it
    var response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${title}: ${genre}: ${description}: ${parameters}`,
      max_tokens: 250,
      temperature: 0.4,
    });
    let script = response.data.choices[0].text;
    let part1 = script.split(".")[0];
    //Send request to get image
    var image_response = await axios({
        method: 'post',
        url: 'https://api.replicate.com/v1/predictions',
        headers: {
            'Authorization': 'Token b1f2603fcb68b9a4e5195732c2092d37e77bb9ab',
            'Content-Type': 'application/json'
        },
        data: {
            version: 'f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1',
            input: {
                prompt: part1
            }
        }
    });
    const image1 = image_response.data;
    res.json({ script: script, image1: image1 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});




const wss = new WebSocket.Server({ port: 3080 });

wss.on('connection', (ws) => {
  // This callback function will be called whenever a new WebSocket connection is established
  console.log('New WebSocket connection');

  // You can use the 'ws' object to send and receive messages through the WebSocket connection
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

/*app.post('/api/generate-short-film', (req, res) => {
  // Get the title, genre, and description from the request body
  const { title, genre, description } = req.body;

  // Call the OpenAI API to generate the script
  axios
    .post('https://api.openai.com/v1/scripts/generate', {
      prompt: `${title}: ${description}`,
      model: 'short-film-script-generation',
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.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}`,
      }
    })
    .then((response) => {
      // Send the generated script through the WebSocket connection
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(response.data.text);
        }
      });
    })
    .catch((error) => {
      // Handle any errors
      res.status(500).json({ error: error.message });
    });
});*/


/*// Import the necessary libraries and dependencies
const express = require('express');
const axios = require('axios');

// Create an instance of the Express app
const app = express();


openai.apiKey = "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";

// Set up the server to parse JSON bodies and handle CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Define the routes for the server
app.post('/api/generate-short-film', (req, res) => {
  // Get the title, genre, and description from the request body
  const { title, genre, description } = req.body;

  // Call the OpenAI API to generate the script
  axios
    .post('https://api.openai.com/v1/scripts/generate', {
      prompt: `${title}: ${description}`,
      model: 'short-film-script-generation',
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.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}`,
      }
    })
    .then((response) => {
      // Send the generated script back in the response
      res.json({ script: response.data.text });
    })
    .catch((error) => {
      // Handle any errors
      res.status(500).json({ error: error.message });
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});*/
