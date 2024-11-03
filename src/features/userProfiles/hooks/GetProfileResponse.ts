import AddressDto from "./AddressDto";
import PersonalInfoDto from "./PersonalInfoDto";
import Role from "../../../store/user/role";

interface GetProfileResponse {
    id: string;
    name: string;
    email: string;
    personalInfo: PersonalInfoDto | null;
    address: AddressDto | null;
    role: Role;
    completed: boolean;
}

export default GetProfileResponse;
