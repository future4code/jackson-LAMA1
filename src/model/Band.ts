export class Band {
  constructor(
    private id: string,
    private name: string,
    private mainGenre: string,
    private responsible: string
  ) { };
  public getId(): string {
    return this.id;
  };
  public getName(): string {
    return this.name;
  };
  public getMainGenre(): string {
    return this.mainGenre;
  };
  public getResponsible(): string {
    return this.responsible;
  };
  public setName(newName: string): void {
    this.name = newName;
  };
  public setMainGenre(newMainGenre: string): void {
    this.mainGenre = newMainGenre;
  };
  public setResponsible(newResponsible: string): void {
    this.responsible = newResponsible;
  };
  public static toBand(data: any): Band  {
    return new Band(
        data.id,
        data.name,
        data.mainGenre || data.main_genre || data.music_genre || data.musicGenre,
        data.responsible
    );
  };
};

export interface BandInputDTO {
 name: string,
  mainGenre: string,
  responsible: string
}

