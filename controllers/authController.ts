import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import connection from "../utils/db";

// Types for the user input
interface UserInput {
  username: string;
  email: string;
  password: string;
  role: number;
}
interface TokenPayload extends JwtPayload {
  email: string;
  role: any; 
}

// Register function
async function register(req: Request, res: Response): Promise<void> {
  const { username, email, password, role }: UserInput = req.body;

  try {
    // Check if the user already exists
    connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err: any, results: any, fields: any) => {
        if (err) {
          console.error("Database error:", err);
          res.status(500).json({ message: "Internal server error" });
          return;
        } else {
          if (results.length > 0) {
            res.status(400).json({ message: "Email already exists" });
            return;
          } else {
            bcrypt.hash(password, 15, (err, hash) => {
              if (err) {
                res.status(500).json({ message: "Something went wrong" });
                return;
              } else {
                const query_sql =
                  "INSERT INTO users (username, email, password, created_at, updated_at, profile, role) VALUES (?, ?, ?, NOW(), NOW(), ?, ?)";
                const values = [username, email, hash, null, role];

                connection.execute(
                  query_sql,
                  values,
                  async function (err, results: any, fields) {
                    if (err) {
                      res.json({ status: "error", message: err });
                      return;
                    } else {
                      // Fetch the role information based on the role ID
                      const roleQuery = "SELECT * FROM roles WHERE roleid = ?";
                      connection.execute(
                        roleQuery,
                        [role],
                        function (roleErr, roleResults) {
                          if (roleErr) {
                            res.json({ status: "error", message: roleErr });
                            return;
                          }

                          const tokenPayload: TokenPayload = {
                            email: email,
                            role: roleResults,
                          };
                          const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "");



                          // const token = jwt.sign(
                          //   { email },
                          //   process.env.JWT_SECRET || ""
                          // );
                          // Include the role information in the response
                          res.json({
                            status: "ok",
                            message: "User registered successfully",
                            token: token,
                            user: {
                              id: results.insertId,
                              username: username,
                              email: email,
                              role: roleResults,
                            },
                          });
                        }
                      );
                    }
                  }
                );
              }
            });
          }
        }
      }
    );
  } catch (error) {
    console.error("Error storing user in the database: ", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

// Login function
async function login(req: Request, res: Response): Promise<void> {
  const { email, password }: UserInput = req.body;
  try {
    connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email],
      function (err: any, results: any[], fields: any) {
        if (err) {
          console.error("Database error:", err);
          res.status(500).json({ message: "Internal server error" });
          return;
        } else {
          //check email are there ??
          if (results.length > 0) {
            //comare password hash
            bcrypt.compare(password, results[0].password, (err, hash) => {
              if (err) {
                res.status(500).json({ message: "Something went wrong" });
                return;
              } else {
                if (hash) {
                  const roleQuery = "SELECT * FROM roles WHERE roleid = ?";
                  const role = results[0].role;
                  connection.execute(
                    roleQuery,
                    [role],
                    function (roleErr, roleResults) {
                      if (roleErr) {
                        res.json({ status: "error", message: roleErr });
                        return;
                      }
                      
                      const tokenPayload: TokenPayload = {
                        email: results[0].email,
                        role: roleResults,
                      };
                      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "");
                      
                      // const token = jwt.sign(
                      //   { email },
                      //   process.env.JWT_SECRET || ""
                      // );
                      // Include the role information in the response
                      res.status(200).json({
                        message: "User logged in successfully !!",
                        token: token,
                        user: {
                          userid: results[0].userid,
                          username: results[0].username,
                          email: results[0].email,
                          role: roleResults,
                          created_at: results[0].created_at,
                        },
                      });
                    }
                  );
                } else {
                  res.status(400).json({
                    message: "Email and password does not match",
                  });
                  return;
                }
              }
            });
          } else {
            res.status(400).json({ message: "Email does not exist" });
            return;
          }
        }
      }
    );
  } catch (error) {
    console.error("Error storing user in the database: ", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

export default { login, register };
