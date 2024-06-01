import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body

    try {
      const client = await clientPromise
      console.log("client: ", client)
      const db = client.db('main_db')
      console.log("db: ", db)
      const collection = db.collection('emails')
      console.log("collection: ", collection)
      await collection.insertOne({ email })
      console.log("insertOne done")
      res.status(200).json({ message: 'Email subscribed successfully!' })
      // Close the MongoDB connection explicitly after the request is handled
      await client.close()
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ error: 'An error occurred while subscribing email.' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
