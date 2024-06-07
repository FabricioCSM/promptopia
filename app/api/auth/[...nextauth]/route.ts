import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { Session } from 'next-auth';

interface CustomSession extends Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async session({ session }: { session: Session }) {
            const sessionUser = await User.findOne({
              email: session.user?.email,
            });
      
            if (session.user && sessionUser) {
              (session as CustomSession).user.id = sessionUser._id.toString();
            }
      
            return session as CustomSession;
        },
    
        async signIn({ profile }: any) {
            try {
                await connectToDB();
    
                const userExists = await User.findOne({
                    email: profile.email
                })
    
                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST};

