import { Request, Response } from "express";
import multer from "multer";
import connection from "../utils/db";
import multerConfig from "../utils/multer_config";

const upload = multer(multerConfig.config).single(multerConfig.keyUpload);

//----------------------------------------
// Get user by id
//----------------------------------------
function getUserById(req: Request, res: Response) {
  try {
    connection.execute(
      "SELECT * FROM users WHERE userid = ?",
      [req.params.userId],
      function (err, results: any) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
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
              res.json({
                userid:req.params.userId,
                username: results[0].username,
                email: results[0].email,
                profile: results[0].profile,
                role:roleResults
              });
            }
          );
        }
      }
    );
  } catch (err) {
    console.error("Error storing user in the database: ", err);
    res.sendStatus(500);
  }
}



//----------------------------------------
// Update user
//----------------------------------------
function updateUser(req: Request, res: Response) {
  console.log(`body: ${JSON.stringify(req.body)}`);
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.log(`error: ${JSON.stringify(err)}`);
      return res.status(500).json({ message: err });
    } else if (err) {
      console.log(`error: ${JSON.stringify(err)}`);
      return res.status(500).json({ message: err });
    } else {
      console.log(`file: ${JSON.stringify(req.file)}`);
      console.log(`body: ${JSON.stringify(req.body)}`);
      try {
        const image = req.file ? req.file.filename : null;
        // const profileImagePath = req.file ? req.file.filename : null;

        let sql =
          "UPDATE users SET profile =?  WHERE userid = ?";
        let params = [ image, req.params.userId];

        connection.execute(sql, params, function (err) {
          if (err) {
            res.json({ status: "error", message: err });
            return;
          } else {
            res.json({
              status: "ok",
              message: "User updated successfully",
              user: {
                userid: req.params.userId,
                profile: image,
              },
            });
          }
        });
      } catch (err) {
        console.error("Error storing user in the database: ", err);
        res.sendStatus(500);
      }
    }
  });
}


export default { getUserById ,updateUser};