import { useTranslation } from "react-i18next";
import { GlobalOutlined } from "@ant-design/icons";
import { Button } from "antd";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const languages: Record<string, string> = {
        en: "Česky",
        cs: "English",
    };

    const toggleLanguage = async () => {
        const nextLang = i18n.language === "en" ? "cs" : "en";
        await i18n.changeLanguage(nextLang);
    };

    return (
        <Button type="text" onClick={toggleLanguage} icon={<GlobalOutlined />}>
            {languages[i18n.language]}
        </Button>
    );
};

export default LanguageSwitcher;
