import SelectedUserType from "../components/userTypeSelection/SelectedUserType";
import AddressDto from "./AddressDto";
import SelectedPersonalInfoDto from "./SelectedPersonalInfoDto";

interface CompleteProfileRequest {
    address: AddressDto;
    personalInfo: SelectedPersonalInfoDto;
    userType: SelectedUserType;
}

export default CompleteProfileRequest;
