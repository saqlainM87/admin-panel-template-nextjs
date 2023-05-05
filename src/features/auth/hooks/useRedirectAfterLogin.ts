"use client";

import { useEffect } from "react";

import { useRouter } from "next/router";
import qs from "query-string";
import { useLocation } from "react-use";

import { useAppSelector } from "@src/redux/store";

function useRedirectAfterLogin() {
  const router = useRouter();
  const location = useLocation();
  const { redirect } = qs.parse(String(location.search));
  const { isAuthenticated } = useAppSelector(state => ({
    isAuthenticated: state.auth?.isAuthenticated,
  }));

  useEffect(() => {
    if (isAuthenticated) {
      router.push((redirect as string) ?? "/");
    }
  }, [redirect, router, isAuthenticated]);
  return null;
}

export default useRedirectAfterLogin;
