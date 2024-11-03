import Role from "./role";

interface UserInfo {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    permissions: string[];
    role: Role;
}

export default UserInfo;
