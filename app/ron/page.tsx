"use server"
import postgres from 'postgres';
export default async function Page() {
  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
  // const response = await sql`SELECT version()`;
  // return { props: { data: response[0].version } };
  console.log(sql)
  return <>{sql}</>;
}
