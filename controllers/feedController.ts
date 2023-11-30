import { Request, Response } from "express";
import multer from "multer";
import connection from "../utils/db";
import multerConfig from "../utils/multer_config";

const upload = multer(multerConfig.config).single(multerConfig.keyUpload);

//----------------------------------------
// Get all feeds
//----------------------------------------
function getAllFeeds(req: Request, res: Response) {
  try {
    connection.execute(
      "SELECT * FROM feeds ORDER BY feedid DESC",
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
    console.error("Error storing feeds in the database: ", err);
    res.sendStatus(500);
  }
}

//----------------------------------------
// Get feed by id
//----------------------------------------
function getByFeedId(req: Request, res: Response) {
  try {
    connection.execute(
      "SELECT * FROM feeds WHERE feedid = ?",
      [req.params.feedId],
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
    console.error("Error storing feed in the database: ", err);
    res.sendStatus(500);
  }
}

//----------------------------------------
// Create feed
//----------------------------------------

function createFeed(req: Request, res: Response) {
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
    }

    try {
      const { title, description } = req.body;
      const image = req.file ? req.file.filename : null;
      console.log(req.file);

      connection.execute(
        "INSERT INTO feeds (title,description,images,created_at,updated_at) VALUES (?,?,?,NOW(),NOW())",
        [title, description, image],
        function (err, results: any) {
          if (err) {
            res.json({ status: "error", message: err });
            return;
          } else {
            res.json({
              status: "ok",
              message: "Feed created successfully",
              feed: {
                feedid: results.insertId,
                title: title,
                description: description,
                images: image,
              },
            });
          }
        }
      );
    } catch (error) {
      console.error("Error storing feed in the database: ", error);
      res.sendStatus(500);
    }
  });
}

//----------------------------------------
// Update feed
//----------------------------------------
function updateFeed(req: Request, res: Response) {
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
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : null;

        let sql =
          "UPDATE feeds SET title = ?, description = ? WHERE feedid = ?";
        let params = [title, description, image, req.params.feedId];

        if (image) {
          sql =
            "UPDATE feeds SET title = ?, description = ?, images = ? WHERE feedid = ?";
          params = [title, description, image, req.params.feedId];
        }

        connection.execute(sql, params, function (err) {
          if (err) {
            res.json({ status: "error", message: err });
            return;
          } else {
            res.json({
              status: "ok",
              message: "Feed updated successfully",
              feed: {
                feedid: req.params.feedId,
                title: title,
                description: description,
                image: image,
              },
            });
          }
        });
      } catch (err) {
        console.error("Error storing feed in the database: ", err);
        res.sendStatus(500);
      }
    }
  });
}



//----------------------------------------
// Delete feed
//----------------------------------------
function deleteFeed(req: Request, res: Response) {
    try {
      connection.execute(
        "DELETE FROM feeds WHERE feedid = ?",
        [req.params.feedId],
        function (err) {
          if (err) {
            res.json({ status: "error", message: err })
            return
          } else {
            res.json({
              status: "ok",
              message: "Feed deleted successfully",
              feed: {
                id: req.params.feedId,
              },
            })
          }
        }
      )
      // Delete file from server
      const fs = require("fs")
      const path = require("path")
      const filePath = path.join(
        __dirname,
        "../public/uploads/",
        req.params.feedId
      )
    } catch (err) {
      console.error("Error storing feed in the database: ", err)
      res.sendStatus(500)
    }
  }

export default { createFeed, updateFeed, getAllFeeds, getByFeedId ,deleteFeed};
