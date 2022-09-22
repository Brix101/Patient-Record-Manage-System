import type { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, error, isLoading } = trpc.useQuery(["hello"]);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div>
      {JSON.stringify(data)}
      <br />
      <>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </>
    </div>
  );
};

export default Home;
