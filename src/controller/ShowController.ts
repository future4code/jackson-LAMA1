import { Request, Response } from "express";
import { showBusiness } from "../business/ShowBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { InputShowDTO } from "../model/Show";

export class ShowController {
  async createShow(req: Request, res: Response) {
    try {
      const input: InputShowDTO = {
        bandId: req.body.bandId,
        weekDay: req.body.weekDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime
      };
      await showBusiness.createShow(input, req.headers.authorization as string);
      res.status(200).send({
        message: "Show criado com sucesso!"
      });
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message
      });
    } finally {
      await BaseDatabase.destroyConnection();
    };
  };
};

export const showController = new ShowController();