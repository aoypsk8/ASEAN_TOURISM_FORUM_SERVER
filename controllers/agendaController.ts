import { Request, Response } from "express";
import connection from "../utils/db";
//----------------------------------------
// Get all agenda
//----------------------------------------
function getAllAgenda(req: Request, res: Response) {
  try {
    connection.execute(
      "SELECT * FROM agendas ORDER BY agendaid DESC",
      function (err, agendaResults: any) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        // Process each agenda
        const agendas = agendaResults.map((agenda: any) => {
          const scheduleQuery = "SELECT * FROM schedule WHERE agendaid = ?";
          const agendaid = agenda.agendaid;
          return new Promise((resolve, reject) => {
            connection.execute(
              scheduleQuery,
              [agendaid],
              function (err, scheduleResult) {
                if (err) {
                  reject(err);
                  return;
                }
                resolve({
                  agendaid: agenda.agendaid,
                  date: agenda.date,
                  month: agenda.month,
                  year: agenda.year,
                  schedule: scheduleResult,
                });
              }
            );
          });
        });

        // Wait for all promises to resolve and send the response
        Promise.all(agendas)
          .then((result) => {
            res.status(200).json({
              status: "ok",
              message: "Get all successfully",
              agendas: result,
            });
          })
          .catch((err) => {
            res.json({ status: "error", message: err });
          });
      }
    );
  } catch (err) {
    console.error("Error retrieving agenda data: ", err);
    res.sendStatus(500);
  }
}

//----------------------------------------
// Get agenda by id
//----------------------------------------
async function getByAgendaId(req: Request, res: Response) {
  try {
    const agendaResults = await executeQuery(
      "SELECT * FROM agendas WHERE agendaid = ?",
      [req.params.agendaId]
    );

    if (agendaResults.length === 0) {
      res
        .status(404)
        .json({ status: "not found", message: "Agenda not found" });
      return;
    }
    const agendas = await Promise.all(
      agendaResults.map(async (agenda: any) => {
        const scheduleQuery = "SELECT * FROM schedule WHERE agendaid = ?";
        const agendaid = agenda.agendaid;

        const scheduleResult = await executeQuery(scheduleQuery, [agendaid]);

        return {
          agendaid: agenda.agendaid,
          date: agenda.data,
          month: agenda.month,
          year: agenda.year,
          schedule: scheduleResult,
        };
      })
    );

    res.status(201).json({
      status: "ok",
      message: "Get all successfully",
      agendas: agendas,
    });
  } catch (err) {
    console.error("Error retrieving agenda from the database: ", err);
    res.sendStatus(500);
  }
}

async function executeQuery(sql: string, params: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.execute(sql, params, function (err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

//----------------------------------------
// Create agenda
//----------------------------------------

function createAgenda(req: Request, res: Response) {
  try {
    const { date, month, year } = req.body;
    connection.execute(
      "INSERT INTO agendas (date,month,year ) VALUES (?,?,?)",
      [date, month, year],
      function (err, results: any) {
        if (err) {
          console.error("Error executing database query:", err);
          res
            .status(500)
            .json({ status: "error", message: "Failed to create agenda" });
        } else {
          res.status(201).json({
            status: "ok",
            message: "Agenda created successfully",
            agenda: {
              agendaid: results.insertId,
              date: date,
              month: month,
              year: year,
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
    const { date, month, year } = req.body;

    let sql = "UPDATE agendas SET date=?,month=?,year=? WHERE agendaid = ?";
    let params = [date, month, year, req.params.agendaId];

    connection.execute(sql, params, function (err, results: any) {
      if (err) {
        console.error("Database error:", err);
        res.json({ status: "error", message: err.message });
        return;
      } else {
        if (results.affectedRows === 0) {
          res
            .status(404)
            .json({ status: "not found", message: "Agenda not found" });
        } else {
          res.json({
            status: "ok",
            message: "Agenda updated successfully",
            agenda: {
              agendaid: req.params.agendaId,
              date: date,
              month: month,
              year: year,
            },
          });
        }
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
      function (err, results: any) {
        if (err) {
          // Check for foreign key constraint violation
          if (err.code === "ER_ROW_IS_REFERENCED_2") {
            res.status(409).json({
              status: "conflict",
              message:
                "Cannot delete agenda. It is referenced by the schedule table.",
            });
          } else {
            res.status(500).json({ status: "error", message: err });
          }
          return;
        } else {
          if (results.affectedRows === 0) {
            res
              .status(404)
              .json({ status: "not found", message: "Agenda not found" });
          } else {
            res.json({
              status: "ok",
              message: "Agenda deleted successfully",
              agenda: {
                agendaid: req.params.agendaId,
              },
            });
          }
        }
      }
    );
  } catch (err) {
    console.error("Error deleting agenda from the database: ", err);
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
