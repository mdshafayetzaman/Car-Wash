import { betterAuth } from 'better-auth'
import { MongoClient } from 'mongodb'
import { mongodbAdapter } from '@better-auth/mongo-adapter'
const client = new MongoClient(process.env.MONGO_DB_URL as string)
const db = client.db("ph-car-wash-system")
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      role: {
        type: ['admin', 'user', 'BranchManager'],
        defaultValue: 'user',
      },
    },
  },
  //...other options
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
})
