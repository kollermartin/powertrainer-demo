import Gender from "../components/completeProfileForm/Gender";

interface SelectedPersonalInfoDto {
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: Gender;
}

export default SelectedPersonalInfoDto;
