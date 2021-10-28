import { connectToDb } from "@danielmat/api-utils"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { NextApiHandler } from "next"
import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"

const auth: NextApiHandler = async (req, res) =>
  NextAuth(req, res, {
    adapter: MongoDBAdapter({
      db: await connectToDb(),
    }),
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        profile: ({ id, name, email }) => ({
          name,
          email,
          id: id as string,
        }),
      }),
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
    ],
  })

export default auth
