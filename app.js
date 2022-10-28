import express from 'express';
import graphqlServer from './graphql'; // We imported this

const appExpress = express();

// We added this
const app = async () => {
  await graphqlServer.listen();
  graphqlServer.applyMiddleware({
    appExpress,
  });
}


export default app;