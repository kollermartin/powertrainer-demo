import PersonalInfoDto from "./PersonalInfoDto";
import AddressDto from "./AddressDto";
import SelectedUserType from "../components/userTypeSelection/SelectedUserType";
import Role from "../../../store/user/role";

interface CompleteProfileResponse {
    id: string;
    name: string;
    email: string;
    personalInfo: PersonalInfoDto;
    address: AddressDto;
    userType: SelectedUserType;
    role: Role;
    completed: boolean;
}

export default CompleteProfileResponse;
