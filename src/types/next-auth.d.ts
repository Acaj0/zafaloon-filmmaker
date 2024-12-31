import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    name: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}
