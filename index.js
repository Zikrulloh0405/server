import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userMethods } from "./db.js"; // Importing userMethods

const typeDefs = ` 
    type Query {
      login(input: Credentials!): LoginResult
    }

    input Credentials {
      email: String!
      password: String!
    }

    union LoginResult = User | LoginError

    type LoginError {
      message: String!
    }
    
    type User {
      id: ID!
      email: String!
      password: String!
      followers: [User]
      following: [User]
      profileImage: String
    }
`;

const resolvers = {
  Query: {
    login: (_, { input }) => {
      const user = userMethods.checkCred(input.email, input.password);
      if (!user) {
        return { message: "Invalid credentials" };
      }
      return user;
    },
  },
  LoginResult: {
    __resolveType(obj) {
      if (obj.message) {
        return "LoginError";
      }
      return "User";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
