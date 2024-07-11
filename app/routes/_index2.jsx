import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "楽しいレビュー投稿" },
    { name: "description", content: "レビューを投稿して笑顔をシェアしましょう！" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">みんなのレビュー募集中！</h1>
      <p className="mt-2">お気に入りの場所や出来事を共有して、みんなで楽しみましょう！</p>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            href="/review"
          >
            あなたの感想を聞かせてください！
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            href="/review"
          >
            面白いレビューでみんなを笑わせよう！
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            href="/review"
          >
            好きな場所を自慢しちゃおう！
          </a>
        </li>
      </ul>
    </div>
  )
};