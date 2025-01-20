const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Ping Route
app.get('/ping', (req, res) => {
    res.send('Pong!');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
