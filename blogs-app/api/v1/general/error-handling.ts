import { ErrorRequestHandler, Request, Response } from "express";

export const apiErrorHandler: ErrorRequestHandler = (err, req: Request, res: Response) => {
    switch (req.app.get("env")) {
        case "development":
            console.log(err);
            return res.status(err.status).json(err);
        case "production":
            // production logging
            return res.status(err.status).json(err.publicVersion());
    }
};