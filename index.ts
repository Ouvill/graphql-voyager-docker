import express from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { express as voyagerMiddleware } from "graphql-voyager/middleware/index.js";

const app = express();
const port = 3000;

const typeDefs = `
type Warrior {
  id: ID!
  name: String!
}

type Query {
  warriors: [Warrior]
}
`;

const executableSchema = makeExecutableSchema({
  typeDefs,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: executableSchema,
    graphiql: true,
  })
);

app.use("/", voyagerMiddleware({ endpointUrl: "/graphql" }));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
