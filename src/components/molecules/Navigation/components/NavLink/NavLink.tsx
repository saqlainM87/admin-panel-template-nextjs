import { memo } from "react";

import Link from "next/link";
import { useTranslation } from "react-i18next";

interface NavLinkProps {
  navItem: any;
}

const NavLink = memo(({ navItem }: NavLinkProps) => {
  const { t } = useTranslation();

  return (
    <Link href={Array.isArray(navItem.path) ? navItem.path[0] : navItem.path}>
      {navItem.navigationTitle
        ? t(navItem.navigationTitle)
        : `Missing navigationTitle for "${navItem.id}"`}
    </Link>
  );
});

export default NavLink;
