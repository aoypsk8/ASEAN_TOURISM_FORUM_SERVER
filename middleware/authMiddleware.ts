import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface RequestWithUser extends Request {
  user?: JwtPayload | string;
}
interface TokenPayload extends JwtPayload {
  email: string;
  role: any;
}

function authenticateToken(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.json({
      message: "Unauthorized",
      status: 401,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || "", (err, user) => {
    if (err) {
      return res.json({
        message: "Forbidden",
        status: 403,
      });
    } else {
      req.user = user;
      next();
    }
  });
}

function authenticateTokenAdmin(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.json({
      message: "Unauthorized",
      status: 401,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || "", (err, user) => {
    if (err) {
      return res.json({
        message: "Forbidden if not admin",
        status: 403,
      });
    } else {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET || "aoy@2023secret"
      ) as TokenPayload;
      console.log(decodedToken.role[0]["rolename"]);
      if (decodedToken.role[0]["rolename"] === "Admin") {
        req.user = user;
        next();
      } else {
        res.json({ message: "Not Admin" });
      }
    }
  });
}
export { authenticateToken, authenticateTokenAdmin };
