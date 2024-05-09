import { Inter } from "next/font/google";
import { GetStaticProps } from "next";

const inter = Inter({ subsets: ["latin"] });

const Home = ({ data }: any) => {
  return <div>{JSON.stringify(data)}</div>;
};

export const getStaticProps: GetStaticProps<any> = async () => {
  try {
    const data = await fetch("/api/user");
    return {
      props: { data: JSON.parse(JSON.stringify(data)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { data: [] },
    };
  }
};

export default Home;
