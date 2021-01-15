import { InvalidInputError } from "../error/InvalidInputError"

export class Show {
  constructor(
    private id: string,
    private bandId: string,
    private weekDay: WeekDay,
    private startTime: number,
    private endTime: number
  ) { };

  public getId(): string {
    return this.id
  };
  public getBandId(): string {
    return this.bandId
  };
  public getWeekDay(): WeekDay {
    return this.weekDay
  };
  public getStartTime(): number {
    return this.startTime
  };
  public getEndTime(): number {
    return this.endTime
  };
  public setWeekDay(newWeekDay: WeekDay): void {
    this.weekDay = newWeekDay
  };
  public setStartTime(newStartTime: number): void {
    this.startTime = newStartTime
  };
  public setEndTime(newEndTime: number): void {
    this.endTime = newEndTime
  };

  public static toWeekDayEnum(data?: any): WeekDay {
    switch (data) {
      case "Friday":
        return WeekDay.FRIDAY
      case "Saturday":
        return WeekDay.SATURDAY
      case "Sunday":
        return WeekDay.SUNDAY
      default:
        throw new InvalidInputError("Invalid WeekDay");
    };
  };

  public static toShow(data?: any) {
    return (data && new Show(
      data.id,
      Show.toWeekDayEnum(data.weekDay || data.week_day || data.day),
      data.bandId || data.band_id,
      data.startTime || data.start_time,
      data.endTime || data.end_time
    ));
  };
};

export interface InputShowDTO {
  bandId: string,
  weekDay: WeekDay,
  startTime: number,
  endTime: number
};

export interface OutputShowDTO {
  id: string,
  bandId: string,
  weekDay: WeekDay,
  startTime: number,
  endTime: number
};

export enum WeekDay {
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
};