// Import the necessary libraries and dependencies
const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-NFL1R7jJVWb9B6QgEreehepg",
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
  const { title, genre, description } = req.body;

  // Use the openai.generate method to generate text using the OpenAI API
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${title}: ${genre}: ${description}`,
    max_tokens: 7,
    temperature: 0,
  }, (error, response) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      // Send the generated script back in the response
      res.json({ script: response.text });
    }
  });
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
