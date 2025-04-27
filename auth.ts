import { FirestoreAdapter, initFirestore } from "@auth/firebase-adapter"
import { cert } from "firebase-admin/app"
import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
export const firestore = initFirestore({
  credential: cert({
    projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
    clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY,
  }),
})

export const { 
  handlers, 
  signIn, 
  signOut, 
  auth} =  NextAuth({
  // https://providers.authjs.dev
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ], 
  adapter: FirestoreAdapter(firestore)
})


