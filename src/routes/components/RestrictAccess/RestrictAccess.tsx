import { Button, Result } from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const RestrictAccess = () => {
  const { t } = useTranslation();
  return (
    <Result
      status="403"
      title={t("default.restrictAccessTitle")}
      subTitle={t("default.restrictAccessText")}
      extra={
        <Link href="/">
          <Button type="primary">{t("default.notFoundBackHomeButton")}</Button>
        </Link>
      }
    />
  );
};

export default RestrictAccess;
