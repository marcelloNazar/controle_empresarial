import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token, role } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (role === "ADMIN") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  if (role === "USER") {
    return {
      redirect: {
        destination: "/user",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  return <div />;
}
