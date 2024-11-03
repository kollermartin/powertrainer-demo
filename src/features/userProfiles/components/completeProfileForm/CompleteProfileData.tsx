import { Dayjs } from "dayjs";

interface CompleteProfileData {
    street: string;
    city: string;
    postalCode: string;
    countryCode: string;
    birthDate: Dayjs;
    gender: number;
    firstName: string;
    lastName: string;
}

export default CompleteProfileData;
