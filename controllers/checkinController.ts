import { Request, Response } from "express";
import connection from "../utils/db";

//----------------------------------------
// Get all checkin
//----------------------------------------
function getAllCheckin(req: Request, res: Response) {
  try {
    connection.execute(
      "SELECT * FROM checkin ORDER BY checkinid DESC",
      function (err, results) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          res.json(results);
        }
      }
    );
  } catch (err) {
    console.error("Error storing checkinid in the database: ", err);
    res.sendStatus(500);
  }
}

//----------------------------------------
// Get checkinid by id
//----------------------------------------
function getByCheckinId(req: Request, res: Response) {
  try {
    connection.execute(
      "SELECT * FROM checkin WHERE checkinid = ?",
      [req.params.checkinId],
      function (err, results) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          res.json(results);
        }
      }
    );
  } catch (err) {
    console.error("Error storing checkin in the database: ", err);
    res.sendStatus(500);
  }
}

//----------------------------------------
// Create checkin
//----------------------------------------

function createCheckin(req: Request, res: Response) {
  try {
    const { userid, description, start_time, end_time, location } = req.body;

    connection.execute(
      "INSERT INTO checkin (userid, description, start_time, end_time, location, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      [userid, description, start_time, end_time, location],
      function (err, results: any) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          res.json({
            status: "ok",
            message: "Check-in created successfully",
            checkin: {
              checkinid: results.insertId,
              userid: userid,
              description: description,
              start_time: start_time,
              end_time: end_time,
              location: location,
            },
          });
        }
      }
    );
  } catch (error) {
    console.error("Error storing check-in in the database: ", error);
    res.sendStatus(500);
  }
}

//----------------------------------------
// Update checkin
//----------------------------------------

function updateCheckin(req: Request, res: Response) {
  console.log(`body: ${JSON.stringify(req.body)}`);

  try {
    const { userid, description, start_time, end_time, location } = req.body;

    let sql =
      "UPDATE checkin SET userid = ?, description = ?, start_time = ?, end_time = ?, location = ? WHERE checkinid = ?";
    let params = [
      userid,
      description,
      start_time,
      end_time,
      location,
      req.params.checkinId,
    ];

    connection.execute(sql, params, function (err) {
      if (err) {
        console.error("Database error:", err);
        res.json({ status: "error", message: err.message });
        return;
      } else {
        res.json({
          status: "ok",
          message: "Check-in updated successfully",
          checkin: {
            checkinid: req.params.checkinId,
            userid: userid,
            description: description,
            start_time: start_time,
            end_time: end_time,
            location: location,
          },
        });
      }
    });
  } catch (err) {
    console.error("Error updating check-in in the database: ", err);
    res.sendStatus(500);
  }
}
//----------------------------------------
// Delete checkin
//----------------------------------------

function deleteCheckin(req: Request, res: Response) {
  try {
    connection.execute(
      "DELETE FROM checkin WHERE checkinid = ?",
      [req.params.checkinId], 
      function (err) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          res.json({
            status: "ok",
            message: "Check-in deleted successfully",
            checkin: {
              checkinid: req.params.checkinId,
            },
          });
        }
      }
    );
  } catch (err) {
    console.error("Error deleting check-in from the database: ", err);
    res.sendStatus(500);
  }
}

export default {
  getAllCheckin,
  getByCheckinId,
  updateCheckin,
  deleteCheckin,
  createCheckin,
};
