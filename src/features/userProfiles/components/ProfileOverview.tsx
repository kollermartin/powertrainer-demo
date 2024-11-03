import { Descriptions, DescriptionsProps } from "antd";
import { useTranslation } from "react-i18next";
import CompleteProfileData from "./completeProfileForm/CompleteProfileData";
import IsoCountries from "../../../localization/IsoCountries";
import Role from "../../../store/user/role";

interface ProfileOverviewProps {
    data: CompleteProfileData;
    role?: Role;
    email: string;
}

const ProfileOverview = ({ data, email, role }: ProfileOverviewProps) => {
    const { t, i18n } = useTranslation("userProfiles");
    const profileItems: DescriptionsProps["items"] = [
        {
            label: t("email"),
            children: email,
        },
        {
            label: t("firstName"),
            children: data.firstName,
        },
        {
            label: t("lastName"),
            children: data.lastName,
        },
        {
            label: t("accountType"),
            children: t(role ? role.toLowerCase() : ""),
            style: { display: role ? "block" : "none" },
        },
        {
            label: t("dateOfBirth"),
            children: data.birthDate ? data.birthDate.format("DD/MM/YYYY") : "",
        },
    ];

    const addressItems: DescriptionsProps["items"] = [
        {
            label: t("street"),
            children: data.street,
        },
        {
            label: t("city"),
            children: data.city,
        },
        {
            label: t("postalCode"),
            children: data.postalCode,
        },
        {
            label: t("country"),
            children: IsoCountries.getName(data.countryCode, i18n.language, {
                select: "official",
            }),
        },
    ];

    return (
        <>
            <Descriptions title={t("personalInfo")} items={profileItems} />
            <Descriptions title={t("address")} items={addressItems} />
        </>
    );
};

ProfileOverview.defaultProps = {
    role: undefined,
};

export default ProfileOverview;
