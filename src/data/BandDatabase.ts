import { Band } from "../model/Band";
import { idGenerator } from "../services/IdGenerator";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
  private static TABLE_NAME = "LAMA_BANDAS";
  async createBand (
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
};

export const bandDatabase = new BandDatabase();