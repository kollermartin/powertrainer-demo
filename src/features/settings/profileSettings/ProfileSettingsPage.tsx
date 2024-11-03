import { Typography } from "antd";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import useGetCurrentUserProfile from "../../userProfiles/hooks/useGetCurrentUserProfile";
import Spinner from "../../../shared/components/Spinner";
import ProfileOverview from "../../userProfiles/components/ProfileOverview";
import UserContext from "../../../store/user/user-context";
import GetProfileResponse from "../../userProfiles/hooks/GetProfileResponse";
import { ToCompleteProfileData } from "../../../shared/utils/profile.utils";

const ProfileSettingsPage = () => {
    const { data, isLoading } = useGetCurrentUserProfile();
    const userCtx = useContext(UserContext);
    const { t } = useTranslation("userProfiles");

    return (
        <>
            {isLoading && <Spinner />}
            {data && userCtx.user && (
                <>
                    <Typography.Title style={{ margin: 0 }} level={3}>
                        {t("profile")}
                    </Typography.Title>
                    <ProfileOverview
                        data={ToCompleteProfileData<GetProfileResponse>(data)}
                        role={userCtx.user.role}
                        email={userCtx.user.email}
                    />
                </>
            )}
        </>
    );
};

export default ProfileSettingsPage;
