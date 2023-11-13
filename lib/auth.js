import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: 'Email',
          type: "email",
          placeholder: 'name@example.com'
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          return null

        const user = await prisma.users.findFirst({
          where: {
            email: credentials.email
          }
        })

        if (!user)
          return null

        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid)
          return null

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          address: user.address
        }
      }
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log('Session callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          address: token.address
        }
      }
    },
    jwt: ({ token, user }) => {
      // console.log('Jwt callback', { token, user })
      if (user) {
        return {
          ...token,
          id: user.id,
          address: user.address
        }
      }
      return token
    }
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },

};
