import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Result
      icon={<QuestionCircleOutlined />}
      title={t("default.notFoundTitle")}
      subTitle={t("default.notFoundText")}
      extra={
        <Link href="/">
          <Button type="primary">{t("default.notFoundBackHomeButton")}</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
