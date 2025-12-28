export default async function handler(req, res) {
  const msg = req.body.message;
  if (!msg || !msg.reply_to_message) return res.send("ok");

  const original = msg.reply_to_message.text;
  const match = original.match(/UserID:\s(\d+)/);
  if (!match) return res.send("ok");

  const userId = match[1];

  await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`
    },
    body: JSON.stringify(msg.text)
  });

  res.send("ok");
}
