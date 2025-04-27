const express = require('express');
const dns = require('dns');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS) from the public directory
app.use(express.static('public'));

// API to validate the domain of an email
app.get('/validate-domain', (req, res) => {
    const email = req.query.email;
    const domain = email.split('@')[1];  // Extract domain from email

    dns.resolve(domain, 'MX', (err, addresses) => {
        if (err || addresses.length === 0) {
            return res.json({ valid: false, message: 'Invalid domain' });
        }
        res.json({ valid: true, message: 'Valid domain' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
