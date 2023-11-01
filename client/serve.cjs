const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
console.log(port);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// All other routes should serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
