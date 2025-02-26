import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import jwt from "jsonwebtoken";

const SECRET_KEY = "mysecretkey";

const users = [{id : 1, userName : 'bob', password : 'qwerty'}];

const data = ["fdfhjdfjks", "fhjdhfjkdhf", "hfjkshfkj", "qazxseqq"]

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type Query {
    getAllData: [String]
  }
  type Mutation {
    login(userName: String!, password: String!): String
  }
`;


const resolvers = {
    Query: {
      getAllData: (_, __, context) => {
        if(!context.user) throw new Error("Not auth");
        return data;
      },
    },
    Mutation : {
        login : (_, {userName, password}) => {
          const existingUser = users.find(u => u.userName === userName && u.password === password);
          if(!existingUser) throw new Error("Wrong username or password");
          const token = jwt.sign({userName , password}, SECRET_KEY, {
            expiresIn : "1h"
          });
          return token;
        }
    }
  };


const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context : async ({req}) => {

      if(req.body.operationName === "Login") return;

      const token = req.headers.authorization;

      let user = null;
      if(token){

        try {
        user = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        } catch (e) {
          console.log(e);
          throw new Error(e.message);
        }
      }
      return {user};
    }
  });
  
  console.log(`🚀  Server ready at: ${url}`);