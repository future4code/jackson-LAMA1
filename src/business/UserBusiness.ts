import { UserInputDTO, LoginInputDTO } from "../model/User";
import { userDatabase } from "../data/UserDatabase";
import { idGenerator } from "../services/IdGenerator";
import { hashManager } from "../services/HashManager";
import { authenticator } from "../services/Authenticator";

class UserBusiness {
    async createUser(user: UserInputDTO) {
        const id = await idGenerator.generate();
        const hashPassword = await hashManager.hash(user.password);
        await userDatabase.createUser(
            id, 
            user.email, 
            user.name, 
            hashPassword, 
            user.role
        );
        const accessToken = authenticator.generateToken({ 
            id, 
            role: user.role 
        });
        return accessToken;
    };

    async getUserByEmail(user: LoginInputDTO) {
        const userFromDB = await userDatabase.getUserByEmail(user.email);
        const hashCompare = await hashManager.compare(
            user.password, 
            userFromDB.getPassword()
        );
        if (!hashCompare) {
            throw new Error("Invalid!");
        };
        const accessToken = authenticator.generateToken({ 
            id: userFromDB.getId(), 
            role: userFromDB.getRole() 
        });
        return accessToken;
    };
};

export const userBusiness = new UserBusiness();