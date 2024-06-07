import { LoaderFunctionArgs, json } from "@remix-run/node";

export async function fetchLoader(
  { request }: LoaderFunctionArgs,
  endpoint: string
) {
  const res = await fetch(`${process.env.API_BASE_URL!}${endpoint}`, {
    headers: request.headers,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  return json(await res.json());
}
