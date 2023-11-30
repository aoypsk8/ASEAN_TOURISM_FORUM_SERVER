import { Request, Response } from "express";
import connection from "../utils/db";

//----------------------------------------
// Get all agenda
//----------------------------------------
function getAllAgenda(req: Request, res: Response) {
  try {
    connection.execute(
      "SELECT * FROM agendas ORDER BY agendaid DESC",
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
    console.error("Error storing agenda in the database: ", err);
    res.sendStatus(500);
  }
}

//----------------------------------------
// Get agenda by id
//----------------------------------------
function getByAgendaId(req: Request, res: Response) {
  try {
    connection.execute(
      "SELECT * FROM agendas WHERE agendaid = ?",
      [req.params.agendaId],
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
    console.error("Error storing agenda in the database: ", err);
    res.sendStatus(500);
  }
}

//----------------------------------------
// Create feed
//----------------------------------------

function createAgenda(req: Request, res: Response) {
  try {
    const { title, description, start_time, end_time, location } = req.body;

    connection.execute(
      "INSERT INTO agendas (title , description , start_time , end_time , location, created_at, updated_at) VALUES (?,?,?,?,?,NOW(),NOW())",
      [title, description, start_time, end_time, location],
      function (err, results: any) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          res.json({
            status: "ok",
            message: "Agenda created successfully",
            agenda: {
              agendaid: results.insertId,
              title: title,
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
    console.error("Error storing agenda in the database: ", error);
    res.sendStatus(500);
  }
}

//----------------------------------------
// Update agenda
//----------------------------------------
function updateAgenda(req: Request, res: Response) {
  console.log(`body: ${JSON.stringify(req.body)}`);

  try {
    const { title, description, start_time, end_time, location } = req.body;

    let sql =
      "UPDATE agendas SET title = ?, description = ?, start_time = ?, end_time = ?, location = ? WHERE agendaid = ?";
    let params = [
      title,
      description,
      start_time,
      end_time,
      location,
      req.params.agendaId,
    ];

    connection.execute(sql, params, function (err) {
      if (err) {
        console.error("Database error:", err);
        res.json({ status: "error", message: err.message });
        return;
      } else {
        res.json({
          status: "ok",
          message: "Agenda updated successfully",
          agenda: {
            agendaid: req.params.agendaId,
            title: title,
            description: description,
            start_time: start_time,
            end_time: end_time,
            location: location,
          },
        });
      }
    });
  } catch (err) {
    console.error("Error updating agenda in the database: ", err);
    res.sendStatus(500);
  }
}

//----------------------------------------
// Delete agenda
//----------------------------------------
function deleteAgenda(req: Request, res: Response) {
  try {
    connection.execute(
      "DELETE FROM agendas WHERE agendaid = ?",
      [req.params.agendaId],
      function (err) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          res.json({
            status: "ok",
            message: "agenda deleted successfully",
            agenda: {
              agendaid: req.params.agendaId,
            },
          });
        }
      }
    );
  } catch (err) {
    console.error("Error storing agendaId in the database: ", err);
    res.sendStatus(500);
  }
}

export default {
  getAllAgenda,
  getByAgendaId,
  updateAgenda,
  deleteAgenda,
  createAgenda,
};
