const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ព័ត៌មាន Bot របស់បង (ខ្ញុំដាក់ឱ្យរួចស្រេច)
const TELEGRAM_TOKEN = '8565835719:AAGadNRYZK967j_J5dWe2kin2ThcFyQdSdU';
const CHAT_ID = '2068531726';

app.post('/api/order', (req, res) => {
    const { userId, zoneId, game, items, price } = req.body;

    const message = `
🌟 **ការបញ្ជាទិញថ្មី!** 🌟
-------------------------
🎮 ហ្គេម: ${game}
🆔 User ID: ${userId}
🌐 Zone ID: ${zoneId}
💎 ទំនិញ: ${items}
💵 តម្លៃ: ${price}
-------------------------
    `;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    axios.post(telegramUrl, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
    })
    .then(() => res.status(200).json({ success: true }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// ប្រើ PORT 3000 សម្រាប់សាកល្បងក្នុងកុំព្យូទ័រ
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));