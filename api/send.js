export default async function handler(req, res) {
  const { userId, url } = req.body;

  await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`
    },
    body: JSON.stringify("waiting")
  });

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.GROUP_ID,
      text: `UserID: ${userId}\nURL: ${url}`
    })
  });

  res.send("ok");
}
