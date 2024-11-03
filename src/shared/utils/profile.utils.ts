import dayjs from "dayjs";
import CompleteProfileData from "../../features/userProfiles/components/completeProfileForm/CompleteProfileData";
import AddressDto from "../../features/userProfiles/hooks/AddressDto";
import PersonalInfo from "../../features/userProfiles/hooks/PersonalInfoDto";

export const ToCompleteProfileData = <T extends { address: AddressDto | null; personalInfo: PersonalInfo | null }>(
    profile: T,
): CompleteProfileData => {
    return {
        birthDate: dayjs(profile.personalInfo?.birthdate),
        street: profile.address?.street ?? "",
        city: profile.address?.city ?? "",
        postalCode: profile.address?.postalCode ?? "",
        countryCode: profile.address?.countryCode ?? "",
        gender: profile.personalInfo?.gender ?? 0,
        firstName: profile.personalInfo?.firstName ?? "",
        lastName: profile.personalInfo?.lastName ?? "",
    };
};
