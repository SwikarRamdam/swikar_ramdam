
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = 'data.json';

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]');
}

app.post('/api/bills', (req, res) => {
    const { grandTotal } = req.body;
    const time = new Date().toISOString();
    const newBill = { grandTotal, time };
    const existingData = JSON.parse(fs.readFileSync(DATA_FILE));
    existingData.push(newBill);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));
    res.json(newBill);
});

app.get('/api/bills', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
});

app.get('/bills', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    let html = '<h1>Submitted Bills</h1><table border="1" cellpadding="5"><tr><th>Grand Total</th><th>Time</th></tr>';
    data.forEach(bill => {
        html += `<tr><td>${bill.grandTotal}</td><td>${bill.time}</td></tr>`;
    });
    html += '</table>';
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
