import { Request, Response, NextFunction } from "express";

export default function (err: any, req: Request, res: Response, next: NextFunction): void {
  res.status(err.status || 500).json({
    status: err.status || 500,
    code: err.code || "INTERNAL_ERR",
    message: err.message || "Internal server error.",
  });
}
