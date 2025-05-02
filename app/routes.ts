import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("roasts", "routes/roasts/roasts.ts"),
  route("theme", "routes/theme/theme.ts"),
] satisfies RouteConfig;
