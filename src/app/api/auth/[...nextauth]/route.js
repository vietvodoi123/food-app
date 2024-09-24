import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "612772319853-3j8cfhshii0q1vtvaa29r9octb4c7c9r.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    // }),
  ],
  // Callbacks for various authentication events
});

export { handler as GET, handler as POST };
