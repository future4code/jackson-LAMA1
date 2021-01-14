import { OutputShowDTO, WeekDay } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
  private static TABLE_NAME = "LAMA_SHOWS";

  public async createShow(
    id: string,
    bandId: string,
    weekDay: string,
    startTime: number,
    endTime: number
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        band_id: bandId,
        week_day: weekDay,
        start_time: startTime,
        end_time: endTime
      })
      .into(ShowDatabase.TABLE_NAME);
  };

  public async getShowsByTimesAndDay(
    weekDay: WeekDay,
    startTime: number,
    endTime: number
  ): Promise<OutputShowDTO> {
    const shows = await this.getConnection().raw(`
      SELECT 
        show.id as id,
        show.start_time as startTime,
        show.end_time as endTime,
        show.week_day as weekDay
      FROM ${ShowDatabase.TABLE_NAME} show
      WHERE show.week_day = "${weekDay}"
      AND WHERE show.start_time < "${endTime}"
      AND WHERE show.end_time >= "${startTime}"
      ORDER BY startTime ASC
    `);
    return shows.map((show: any) => {
      return {
        id: show.id,
        bandId: show.bandId,
        weekDay: show.weekDay,
        startTime: show.startTime,
        endTime: show.endTime,
      };
    });
  };
};

export const showDatabase = new ShowDatabase()