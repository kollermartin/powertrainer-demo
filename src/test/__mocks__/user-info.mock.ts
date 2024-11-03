import UserInfo from "../../store/user/UserInfo";
import Role from "../../store/user/role";

export const mockUserInfo = (config?: Partial<UserInfo>): UserInfo => {
    return {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@test.com",
        role: Role.Trainer,
        permissions: [],
        id: "123",
        ...config,
    };
};
