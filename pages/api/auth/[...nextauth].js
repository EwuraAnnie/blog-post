// catch all route
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../libs/dbConnect";

import User from "../../../models/user.model";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Annie",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "john.doe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "Please enter your password",
        },
      },
      authorize: async (credentials) => {
        await dbConnect();
        const { email, password } = credentials;

        // checking if user is on the database
        let user = await User.findOne({ email });
        if (!user) {
          return null;
        }

        // checking if passwords match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        // returning the user
        return user;
      },
    }),
  ],
  callback: {
    jwt: ({ token, user }) => {
      if (token) {
        token.id = user._id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session) {
        session.id = token.id;
        session.firstName = token.firstName;
        session.lastName = token.lastName;
      }
      return session;
    },
  },
  secret: "secret",
  jwt: {
    secret: "ThisIsMySecret",
    encrypt: true,
  },
});
