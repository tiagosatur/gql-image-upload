const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors')
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type File {
    url: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    hello: String!
  }

  type Mutation {
    uploadFile(file: Upload!): File!
  }
`;

const PORT = 4000

const resolvers = {
  Query: {
    hello: () => 'Hellowww'
  },
  Mutation: {
    uploadFile: async (parent, { file }) => {
     const { createReadStream, filename, mimetype, encoding } = await file;
     const { ext } = path.parse(filename)
     const randomName = Math.random().toString(36).substring(2) + ext
     const fileStream = createReadStream()
     const folderName = '/public/images/'
     const pathName = path.join(__dirname, `${folderName}${randomName}`)
     
     await fileStream.pipe(fs.createWriteStream(pathName))

     return {
         url: `http://localhost:4000${folderName}${randomName}`,
     }
    },
  },
};



const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const app = express()

server.applyMiddleware({ app })

app.use(express.static('public'))

app.use(cors)

app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
});
