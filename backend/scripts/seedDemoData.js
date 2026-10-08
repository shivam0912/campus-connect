import crypto from 'node:crypto'
import fs from 'node:fs'
import mongoose from 'mongoose'
import connectDB from '../config/db.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

if (!process.env.MONGO_URI && process.env.MONGO_URI_FILE) {
  process.env.MONGO_URI = fs.readFileSync(process.env.MONGO_URI_FILE, 'utf8').trim()
}

const demoListings = [
  {
    name: 'Engineering Drawing Kit',
    description: 'Complete geometry and drafting set in excellent condition. Ideal for first-year engineering coursework.',
    category: 'Study gear',
    price: 650,
    negotiable: true,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Scientific Calculator',
    description: 'Reliable non-programmable scientific calculator with protective cover and a fresh battery.',
    category: 'Electronics',
    price: 900,
    negotiable: false,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Data Structures Book Bundle',
    description: 'Three carefully used reference books covering algorithms, data structures, and interview practice.',
    category: 'Books',
    price: 1100,
    negotiable: true,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Compact Wooden Study Desk',
    description: 'Sturdy space-saving desk with a lower shelf. A practical fit for a hostel room or shared flat.',
    category: 'Room essentials',
    price: 2400,
    negotiable: true,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'USB Study Lamp',
    description: 'Warm LED desk lamp with adjustable neck, three brightness levels, and a USB charging port.',
    category: 'Room essentials',
    price: 700,
    negotiable: false,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Badminton Racket Pair',
    description: 'Lightweight racket pair with covers and a tube of shuttlecocks. Ready for evening games.',
    category: 'Sports',
    price: 1200,
    negotiable: true,
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
  },
]

const run = async () => {
  await connectDB()

  let seller = await User.findOne({ email: 'demo@campus-connect.local' })
  if (!seller) {
    seller = await User.create({
      name: 'Campus Demo Seller',
      email: 'demo@campus-connect.local',
      password: crypto.randomBytes(32).toString('hex'),
      address: 'Campus Demo Block',
      contact: { phone_no: '0000000000', isVerified: true },
      isAdmin: false,
    })
  }

  const expiresOn = new Date('2027-12-31T23:59:59.000Z')
  for (const listing of demoListings) {
    await Product.findOneAndUpdate(
      { user: seller._id, name: listing.name },
      {
        $set: {
          images: [{ image1: listing.image }],
          description: listing.description,
          category: listing.category,
          Cost: { price: listing.price, negotiable: listing.negotiable },
          expiresOn,
          shippingAddress: {
            address: 'Campus main gate pickup',
            city: 'Campus',
            shippingCharge: 0,
          },
          seller: {
            sellername: seller.name,
            selleraddress: seller.address,
            selleremail: seller.email,
            phoneNo: { mobile: seller.contact.phone_no, isVerified: true },
          },
        },
        $setOnInsert: { reviews: [] },
      },
      { upsert: true, setDefaultsOnInsert: true }
    )
  }

  const legacyProducts = await Product.find({ 'images.image1': /^http:\/\/res\.cloudinary\.com/ })
  for (const product of legacyProducts) {
    product.images = product.images.map(({ image1 }) => ({
      image1: image1.replace('http://res.cloudinary.com', 'https://res.cloudinary.com'),
    }))
    await product.save()
  }

  console.log(`Demo catalog ready: ${demoListings.length} listings upserted.`)
}

run()
  .catch((error) => {
    console.error(`Demo seed failed: ${error.message}`)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.connection.close()
  })
