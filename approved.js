export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { paymentId } = req.body;

  console.log("Approve payment:", paymentId);

  return res.status(200).json({
    success: true,
    paymentId
  });
}
