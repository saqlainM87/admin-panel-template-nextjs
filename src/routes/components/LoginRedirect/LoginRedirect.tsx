import { useRouter } from "next/router";
import qs from "query-string";
import { useLocation } from "react-use";

import { AuthPathsEnum } from "@features/auth/auth";

const LoginRedirect = () => {
  const location = useLocation();
  const router = useRouter();

  router.push({
    pathname: AuthPathsEnum.LOGIN,
    search: qs.stringify({
      redirect: String(location.pathname) + String(location.search),
    }),
  });

  return null;
};

export default LoginRedirect;
