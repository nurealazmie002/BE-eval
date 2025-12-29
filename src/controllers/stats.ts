import { Request, Response } from "express";
import { StatsService } from "../services/stats.js";

const statsService = new StatsService();

export class StatsController {
  private readonly statsService: StatsService;

  constructor(statsService: StatsService) {
    this.statsService = statsService;
  }

  public async getAdminStats(_req: Request, res: Response) {
    const stats = await this.statsService.getAdminStats();

    res.status(200).json({
      success: true,
      message: "Admin statistics retrieved successfully",
      data: stats
    });
  }
}

export const statsController = new StatsController(statsService);
