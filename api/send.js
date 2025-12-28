export default async function handler(req, res) {
  const { url } = req.body;

  const sent = await fetch(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.GROUP_ID,
        text: `URL:\n${url}`
      })
    }
  );

  // wait for admin reply manually
  res.send("Waiting for admin reply. Please refresh later.");
}
