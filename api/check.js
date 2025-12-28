export default async function handler(req, res) {
  const { userId } = req.query;

  const r = await fetch(
    `${process.env.UPSTASH_REDIS_REST_URL}/get/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`
      }
    }
  );

  const data = await r.json();
  res.send(data.result || "waiting");
}
