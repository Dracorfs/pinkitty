import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Pinkitty</title>
        <meta name="description" content="Pin the best dev. toolkits!" />
        <link rel="icon" href="https://img.icons8.com/color/48/null/cat_in_a_box.png" />
      </Head>
      <header className="fixed top-0 inset-x-0 bg-[hsl(52,99%,62%)] h-auto flex items-center justify-start p-3 gap-1">
        <img src="https://img.icons8.com/color/48/null/cat_in_a_box.png" alt="Logo" className="h-8 max-h-40" />
        <p className="text-3xl font-extrabold tracking-tight text-[hsl(280,100%,70%)]">Pinkitty</p>
        <AuthShowcase />
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[hsl(267,72%,63%)]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(52,99%,62%)]">Pinkitty</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-[hsl(172,100%,48%)]">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div>
      <p className="text-center text-2xl text-[hsl(280,100%,70%)]">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-[hsl(280,100%,70%)] no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
