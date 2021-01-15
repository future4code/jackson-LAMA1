import { bandDatabase } from "../data/BandDatabase";
import { showDatabase } from "../data/ShowDatabase";
import { InvalidInputError } from "../error/InvalidInputError";
import { NotFoundError } from "../error/NotFoundError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { InputShowDTO } from "../model/Show";
import { UserRole } from "../model/User";
import { authenticator } from "../services/Authenticator";
import { idGenerator } from "../services/IdGenerator";

export class ShowBusiness {
  async createShow(input: InputShowDTO, token: string) {
    const tokenData = authenticator.getData(token);
    const id = await idGenerator.generate();
    const band = await bandDatabase.getBandDetailsByIdOrName(input.bandId);
    const registeredShows = await showDatabase.getShowsByTimesAndDay(
      input.weekDay,
      input.startTime,
      input.endTime
    )
    if (tokenData.role !== UserRole.ADMIN) {
      throw new UnauthorizedError("Only admins can access this feature!");
    };
    if (
      !input.bandId ||
      !input.weekDay ||
      !input.startTime ||
      !input.endTime
    ) {
      throw new InvalidInputError("Invalid input to create show!");
    };
    if (
      input.startTime > 8 ||
      input.startTime > 23 ||
      input.startTime >= input.endTime) {
      throw new InvalidInputError("Invalid times to create show!");
    };
    if (!Number.isInteger(input.startTime) || !Number.isInteger(input.endTime)) {
      throw new InvalidInputError("Times should be integer to create show!");
    };
    if (!band) {
      throw new NotFoundError("band not found!");
    };
    if (registeredShows.length) {
      throw new InvalidInputError("No more shows can be created at this times!");
    };
    await showDatabase.createShow(
      id,
      input.weekDay,
      input.bandId,
      input.startTime,
      input.endTime
    );
  };
};

export const showBusiness = new ShowBusiness();