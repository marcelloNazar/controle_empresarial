import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated, isAdmin } from "../utils/auth";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      if (isAdmin()) {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } else {
      router.push("/login");
    }
  }, []);

  return <div />;
};

export default HomePage;
