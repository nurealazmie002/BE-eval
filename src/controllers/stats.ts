import { Request, Response } from "express";
import { StatsService } from "../services/stats";

const statsService = new StatsService();

export class StatsController {
  async getAdminStats(_req: Request, res: Response) {
    const stats = await statsService.getAdminStats();

    res.status(200).json({
      success: true,
      message: "Admin statistics retrieved successfully",
      data: stats
    });
  }
}
