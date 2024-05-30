import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sooner" },
    {
      name: "description",
      content: "Best Time Tracking Extension For VS Code",
    },
  ];
};

export default function Index() {
  return <div className="">Landing page</div>;
}
