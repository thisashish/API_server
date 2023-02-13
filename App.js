  const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Load the database data
const db = require('./db.json');

// Construct a GraphQL schema
const schema = buildSchema(`
  type Bank {
    name: String
    branches: [Branch]
  }

  type Branch {
    name: String
    location: String
    assets: Int
  }

  type Query {
    bankBranches: [Bank]
  }
`);

// Define the root query
const rootQuery = {
  bankBranches: () => db,
};

const app = express();

// Mount the GraphQL endpoint
app.use('/gql', graphqlHTTP({
  schema,
  rootValue: rootQuery,
  graphiql: true,
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}/gql`);
});
