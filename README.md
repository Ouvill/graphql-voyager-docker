# GraphQL Voyager Docker

Docker image for [GraphQL Voyager](https://github.com/IvanGoncharov/graphql-voyager)

## Usage

Connect to a GraphQL endpoint

```bash
docker run -p 8080:80 -e ENDPOINT_URL=http://localhost:3000/graphql ouvill/graphql-voyager
```

Use a Schema from environment variable

```bash
docker run -p 8080:80 -e SCHEMA="$(cat schema.graphql)" ouvill/graphql-voyager
```

Use a local schema file

```bash
docker run -p 8080:80 -v $(pwd)/schema.graphql:/app/schema.graphql ouvill/graphql-voyager
```

The order of preference is `endpoint` > `environment variables` > `local files`.
