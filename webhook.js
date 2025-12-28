let store = global.store || (global.store = {});

export default function handler(req, res) {
  const msg = req.body.message;

  if (!msg || !msg.reply_to_message) {
    return res.send("ok");
  }

  const originalText = msg.reply_to_message.text;
  const match = originalText.match(/UserID:\s(\d+)/);

  if (match) {
    const userId = match[1];
    store[userId] = msg.text;
  }

  res.send("ok");
}