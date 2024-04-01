import fastify from "fastify";
import { userRoutes } from "./routes/user-routes";

const port = Number(process.env.PORT) || 3333;
const app = fastify();

app.register(userRoutes, { prefix: "/api/v1/user" });

app.listen({ port }, () => {
  console.log(`App running on ${port}`);
});
