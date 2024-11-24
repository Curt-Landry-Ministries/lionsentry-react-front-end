import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils";

const useLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const check = await isLoggedIn();

      setLoggedIn(check);
    };

    checkLoggedIn();
  }, []);

  return loggedIn;
};

export default useLoggedIn;
