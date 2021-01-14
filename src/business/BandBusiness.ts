import { bandDatabase } from "../data/BandDatabase";
import { Band, BandInputDTO } from "../model/Band";
import { idGenerator } from "../services/IdGenerator";
import { authenticator } from "../services/Authenticator";
import { UserRole } from "../model/User";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { InvalidInputError } from "../error/InvalidInputError";

class BandBusiness {
  async createBand(input: BandInputDTO, token: string) {
    const tokenData = authenticator.getData(token);
    const id = await idGenerator.generate();
    if (tokenData.role !== UserRole.ADMIN) {
      throw new UnauthorizedError("Unauthorized user!");
    };
    if (!input.name || !input.mainGenre || !input.responsible) {
      throw new InvalidInputError("Invalid input to register band!");
    };
    await bandDatabase.createBand(
      id,
      input.name,
      input.mainGenre,
      input.responsible
    );
  };

  async getBandDetailsByIdOrName(input: string): Promise<Band> {
    if (!input) {
      throw new InvalidInputError("Invalid input!");
    };
    return bandDatabase.getBandDetailsByIdOrName(input);
  };
};

export const bandBusiness = new BandBusiness();