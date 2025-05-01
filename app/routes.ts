import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("roasts", "routes/roasts/roasts.server.ts"),
] satisfies RouteConfig;
