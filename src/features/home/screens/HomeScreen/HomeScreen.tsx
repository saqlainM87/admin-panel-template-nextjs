import { useTranslation } from "react-i18next";

import ContentLayout from "@components/layouts/ContentLayout/ContentLayout";
import { getCurrentLanguage } from "@features/localization/localization";

const HomeScreen = () => {
  const { t } = useTranslation();
  return (
    <ContentLayout header={{ title: t("home.title") }}>
      <p>
        {t("home.text")}
        {getCurrentLanguage()}
      </p>
    </ContentLayout>
  );
};

export default HomeScreen;
