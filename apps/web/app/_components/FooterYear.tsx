import { connection } from "next/server";

export default async function FooterYear() {
  await connection();

  return <>{new Date().getFullYear()}</>;
}
