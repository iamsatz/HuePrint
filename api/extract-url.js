import { extractUrlColors } from '../lib/extractUrl.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: true, message: 'Method not allowed.' })
  }

  const { url } = req.body || {}
  try {
    const result = await extractUrlColors(url, {
      allowPrivateNetwork: false,
    })
    return res.json(result)
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: 'Something went wrong while extracting this URL. Please try again.',
    })
  }
}
