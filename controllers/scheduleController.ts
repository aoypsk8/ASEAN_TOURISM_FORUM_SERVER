import { Request, Response } from "express";
import connection from "../utils/db";
import { RowDataPacket } from "mysql2";

//----------------------------------------
// Get all schedule
//----------------------------------------
function getAllSchedule(req: Request, res: Response) {
  try {
    connection.execute(
      "SELECT * FROM schedule ORDER BY scheduleid DESC",
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
    console.error("Error storing schedule in the database: ", err);
    res.sendStatus(500);
  }
}

//----------------------------------------
// Get schedule by id
//----------------------------------------
function getByScheduleId(req: Request, res: Response) {
  try {
    connection.execute(
      "SELECT * FROM schedule WHERE scheduleid = ?",
      [req.params.scheduleId],
      function (err, results) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          const rowResults = results as RowDataPacket[];

          if (rowResults.length === 0) {
            // Schedule not found
            res.status(404).json({ status: "not found", message: "Schedule not found" });
          } else {
            // Schedule found
            res.json(rowResults);
          }
        }
      }
    );
  } catch (err) {
    console.error("Error storing schedule in the database: ", err);
    res.sendStatus(500);
  }
}

//----------------------------------------
// Create schedule
//----------------------------------------

function createSchedule(req: Request, res: Response) {
  try {
    const { title, location, start_time, end_time, description, agendaid } =
      req.body;
    console.log();

    connection.execute(
      "INSERT INTO schedule (title, location, start_time, end_time, description,agendaid, created_at, updated_at) VALUES (?,?,?,?,?,?,NOW(),NOW())",
      [title, location, start_time, end_time, description, agendaid],
      function (err, results: any) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          try {
            res.json({
              status: "ok",
              message: "schedule created successfully",
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    );
  } catch (error) {
    console.error("Error storing schedule in the database: ", error);
    res.sendStatus(500);
  }
}
//----------------------------------------
// Update schedule
//----------------------------------------
function updateSchedule(req: Request, res: Response) {
  console.log(`body: ${JSON.stringify(req.body)}`);

  try {
    const { title, location, start_time, end_time, description, agendaid } =
      req.body;

    let sql =
      "UPDATE schedule SET title=?, location=?, start_time=?, end_time=?, description=?, agendaid=? WHERE scheduleid = ?";
    let params = [
      title,
      location,
      start_time,
      end_time,
      description,
      agendaid,
      req.params.scheduleId,
    ];

    connection.execute(sql, params, function (err, results:any) {
      if (err) {
        console.error("Database error:", err);
        res.json({ status: "error", message: err.message });
        return;
      } else {
        // Check if any rows were affected
        if (results.affectedRows === 0) {
          res.status(404).json({ status: "not found", message: "Schedule not found" });
        } else {
          res.json({
            status: "ok",
            message: "Schedule updated successfully",
            agenda: {
              scheduleid: req.params.scheduleId,
              title: title,
              location: location,
              start_time: start_time,
              end_time: end_time,
              description: description,
              agendaid: agendaid,
            },
          });
        }
      }
    });
  } catch (err) {
    console.error("Error updating schedule in the database: ", err);
    res.sendStatus(500);
  }
}

//----------------------------------------
// Delete schedule
//----------------------------------------
function deleteSchedule(req: Request, res: Response) {
  try {
    connection.execute(
      "DELETE FROM schedule WHERE scheduleid = ?",
      [req.params.scheduleId],
      function (err, results:any) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          if (results.affectedRows === 0) {
            res.status(404).json({ status: "not found", message: "Schedule not found" });
          } else {
            res.json({
              status: "ok",
              message: "Schedule deleted successfully",
              agenda: {
                scheduleid: req.params.scheduleId,
              },
            });
          }
        }
      }
    );
  } catch (err) {
    console.error("Error deleting schedule from the database: ", err);
    res.sendStatus(500);
  }
}

export default {
  getAllSchedule,
  getByScheduleId,
  updateSchedule,
  deleteSchedule,
  createSchedule,
};
