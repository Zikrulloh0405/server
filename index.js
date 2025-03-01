import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { postMethods, userMethods } from "./db.js";

const typeDefs = ` 
    type Query {
       test(input: Credentials!): LoginResult
    }

    type Mutation {
      login(input: Credentials!): LoginResult
      createPost(input: PostInput): Post
    }

    input PostInput {
      userId : ID
      postTitle : String
      postDesc : String
      postImage : String
    }

    type Post {
        id : ID,
        userId : ID,
        postImage : String,
        postTitle : String,
        postDesc : String,
        likes : [Int],
    }

    input Credentials {
      userEmail: String!
      password: String!
    }

    union LoginResult = User | LoginError

    type LoginError {
      message: String!
    }
    
    type User {
      id: ID!
      userEmail: String!
      password: String!
      followers: [User]
      following: [User]
      profileImage: String
    }
`;

const resolvers = {
  Query: {},

  LoginResult: {
    __resolveType(obj) {
      if (obj.message) {
        return "LoginError";
      }
      return "User";
    },
  },

  Mutation: {
    login: (_, { input }) => {
      const user = userMethods.checkCred(input);
      if (!user) {
        return { message: "Invalid credentials" };
      }
      return user;
    },

    createPost: (_, { input }) => {
      const newPost = postMethods.createPost(input)
      return newPost
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
