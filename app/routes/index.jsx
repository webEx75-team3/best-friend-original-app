import pkg from '@remix-run/node';

const { MetaFunction } = pkg;

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [
    { title: "ずっともページ" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function links() {
  // Assuming topLinks is defined elsewhere
  return [...topLinks()];
}

export default function Index() {
  return <Top />;
}






