"use client";

import { memo } from "react";

import { Button as AntdButton } from "antd";
import { ButtonProps as AntdButtonProps } from "antd/es/button";
import classnames from "classnames/bind";
import Link, { LinkProps } from "next/link";

import { isURL } from "@src/helpers/util.helper";

import styles from "./Button.module.scss";

const cx = classnames.bind(styles);

interface ButtonProps extends Omit<AntdButtonProps, "href"> {
  /**
   * Turn button into link, accepts internal and external links (optional)
   */
  to?: LinkProps["href"];
  /**
   * Remove horizontal padding (optional)
   */
  noPadding?: boolean;
}

const Button = memo(({ to, className, noPadding, ...rest }: ButtonProps) => {
  const isExternalLink = typeof to === "string" && isURL(to);

  const buttonContent = (
    <AntdButton
      className={cx(styles.button, className, {
        noPadding,
      })}
      {...(isExternalLink && {
        href: to as string,
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      {...rest}
    />
  );

  // Only wrap in react router link, if internal link
  if (!isExternalLink && to) {
    return <Link href={to}>{buttonContent}</Link>;
  }

  return buttonContent;
});

export default Button;
