import { NotFoundError } from "../error/NotFoundError";
import { Band } from "../model/Band";
import { idGenerator } from "../services/IdGenerator";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
  private static TABLE_NAME = "LAMA_BANDAS";
  async createBand(
    id: string,
    name: string,
    mainGenre: string,
    responsible: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          music_genre: mainGenre,
          responsible
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    };
  };

  public async getBandDetailsByIdOrName(input: string): Promise<Band> {
    const band = await this.getConnection()
      .select("*")
      .from(BandDatabase.TABLE_NAME)
      .where({ id: input })
      .orWhere({ name: input })
    if (!band[0]) {
      throw new NotFoundError(`Unable to found Band with input: ${input}`);
    };
    return Band.toBand(band[0]);
  }
};

export const bandDatabase = new BandDatabase();