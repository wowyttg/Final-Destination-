let store = global.store || (global.store = {});

export default async function handler(req, res) {
  const { userId, url } = req.body;

  store[userId] = "waiting";

  await fetch(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.GROUP_ID,
        text: `UserID: ${userId}\nURL: ${url}`
      })
    }
  );

  res.status(200).send("ok");
}
