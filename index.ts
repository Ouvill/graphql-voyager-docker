import express from "express";
import { readFile } from "node:fs/promises";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { express as voyagerMiddleware } from "graphql-voyager/middleware/index.js";

async function read_schema(path: string) {
  try {
    const fileSchema = await readFile(path, "utf8");
    return fileSchema;
  } catch {
    return "";
  }
}

async function main() {
  const port = process.env.PORT || 80;
  const ENDPOINT_URL = process.env.ENDPOINT_URL;
  const SCHEMA = process.env.SCHEMA;
  const schema_path = process.env.SCHEMA_PATH || "/app/schema.graphql";

  const schema = SCHEMA ?? (await read_schema(schema_path));

  if (!schema && !ENDPOINT_URL) {
    console.error("No schema or endpoint url provided");
    return;
  }

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (schema) {
    const executableSchema = makeExecutableSchema({
      typeDefs: schema,
    });
    app.use(
      "/graphql",
      graphqlHTTP({
        schema: executableSchema,
        graphiql: true,
      })
    );
  }

  const endpointUrl = ENDPOINT_URL || "/graphql";
  app.use("/", voyagerMiddleware({ endpointUrl: endpointUrl }));

  app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
  });
}


process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit(1);
});
main();
