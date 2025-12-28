let store = global.store || (global.store = {});

export default function handler(req, res) {
  const { userId } = req.query;
  res.send(store[userId] || "waiting");
}