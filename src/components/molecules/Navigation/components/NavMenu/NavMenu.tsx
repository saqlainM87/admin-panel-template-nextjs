import { DownOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { MenuProps } from "antd/lib/menu";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-use";

import { usePermissions } from "@features/permissions/permissions";
import { PRIVATE_LIST } from "@src/routes/routes.config";

import NavLink from "../NavLink/NavLink";
import styles from "./NavMenu.module.scss";

interface NavMenuProps {
  isSidebar?: boolean;
  mode?: MenuProps["mode"];
}

const NavMenu = ({ isSidebar, mode }: NavMenuProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  const { hasPermissions } = usePermissions();

  const checkPermissions = (item: any | any) =>
    "permissions" in item ? hasPermissions(item.permissions) : true;

  const navLinks: any[] = PRIVATE_LIST.filter(
    route => !route.hideInNavigation && checkPermissions(route)
  );

  const rootPathname = isSidebar
    ? [...String(location.pathname).split(/(?=\/)/g, 1)]
    : undefined;

  const highlightMenu = [
    ...String(location.pathname).split(/(?=\/)/g, 1), // Highlight root url
    String(location.pathname).substr(
      0,
      String(location.pathname).lastIndexOf("/")
    ), // Highlight parent url
    String(location.pathname), // Highlight entire url
  ];

  /**
   * Ant Design has a bug, where it is NOT possible
   * to create custom wrapper components around the Menu's sub components.
   * So all AntD Menu components need to be in the same render for now
   */
  return (
    <Menu
      mode={mode}
      selectedKeys={highlightMenu}
      defaultOpenKeys={rootPathname}
      theme="dark"
    >
      {navLinks.map(navItem =>
        navItem.nestedRoutes?.length ? (
          <Menu.SubMenu
            key={Array.isArray(navItem.path) ? navItem.path[0] : navItem.path}
            popupOffset={[-16, 7]}
            title={
              <div className={styles.subMenuItem}>
                <span>
                  {navItem.navigationTitle
                    ? t(navItem.navigationTitle)
                    : `Missing navigationTitle for "${navItem.id}"`}
                </span>
                {!isSidebar && <DownOutlined className={styles.icon} />}
              </div>
            }
          >
            {navItem.nestedRoutes
              ?.filter(checkPermissions)
              .map((subItem: any | any) =>
                "groupTitle" in subItem ? (
                  <Menu.ItemGroup
                    key={subItem.id}
                    title={t(subItem.groupTitle)}
                  >
                    {subItem.nestedRoutes
                      ?.filter(checkPermissions)
                      .map(subGroupItem => (
                        <Menu.Item
                          key={
                            Array.isArray(subGroupItem.path)
                              ? subGroupItem.path[0]
                              : subGroupItem.path
                          }
                        >
                          <NavLink navItem={subGroupItem} />
                        </Menu.Item>
                      ))}
                  </Menu.ItemGroup>
                ) : (
                  <Menu.Item
                    key={
                      Array.isArray(subItem.path)
                        ? subItem.path[0]
                        : subItem.path
                    }
                  >
                    <NavLink navItem={subItem} />
                  </Menu.Item>
                )
              )}
          </Menu.SubMenu>
        ) : (
          <Menu.Item
            key={Array.isArray(navItem.path) ? navItem.path[0] : navItem.path}
          >
            <NavLink navItem={navItem} />
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

export default NavMenu;
