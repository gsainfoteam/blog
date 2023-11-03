import { Client, isFullPageOrDatabase } from '@notionhq/client';

export default async function Home() {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const data = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Status',
      status: { equals: 'Done' },
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        {data.results.map((page) => (
          <li key={page.id}>
            {isFullPageOrDatabase(page) &&
              page.properties.Name.type === 'title' &&
              Array.isArray(page.properties.Name.title) &&
              page.properties.Name.title[0].plain_text}
          </li>
        ))}
      </ul>
    </main>
  );
}
