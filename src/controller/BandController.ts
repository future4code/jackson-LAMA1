import { Request, Response } from "express";
import { BandInputDTO } from "../model/Band";
import { bandBusiness } from "../business/BandBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

class BandController {
  async createBand(req: Request, res: Response) {
    try {
      const input: BandInputDTO = {
        name: req.body.name,
        mainGenre: req.body.mainGenre,
        responsible: req.body.responsible
      }
      await bandBusiness.createBand(input, req.headers.authorization as string)
      res.status(200).send({
        message: "Banda cadastrada com sucesso!"
      });
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message
      });
    } finally {
      await BaseDatabase.destroyConnection();
    };
  };

  async getBandDetailsByIdOrName(req: Request, res: Response) {
    try {
      const input = (req.query.id ?? req.query.name) as string;
      const band = await bandBusiness.getBandDetailsByIdOrName(input);
      res.status(200).send(band);
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message
      });
    } finally {
      await BaseDatabase.destroyConnection();
    };
  };
};

export const bandController = new BandController();