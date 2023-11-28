exports.seed = function (knex: any) {
  const feedcomments = [
    {
      feedid: 1,
      userid: 1,
      commenttext: "Good but it inot good enought !! ",
      createdAt: new Date(),
    },
    {
        feedid: 1,
        userid: 2,
        commenttext: "Good but it inot good enought !! ",
        createdAt: new Date(),
      },
      {
        feedid: 2,
        userid: 1,
        commenttext: "Good but it inot good enought !! ",
        createdAt: new Date(),
      },
      {
        feedid: 3,
        userid: 2,
        commenttext: "Good but it inot good enought !! ",
        createdAt: new Date(),
      },
      {
        feedid: 2,
        userid: 1,
        commenttext: "Good but it inot good enought !! ",
        createdAt: new Date(),
      },
      {
        feedid: 3,
        userid: 1,
        commenttext: "Good but it inot good enought !! ",
        createdAt: new Date(),
      },
  ];

  return knex("feeds")
    .del()
    .then(function () {
      return knex("feeds").insert(
        feedcomments.map((feedcooment) => ({
          feedid: feedcooment.feedid,
          userid: feedcooment.userid,
          commenttext: feedcooment.commenttext,
          created_at: feedcooment.createdAt,
          updated_at: feedcooment.createdAt,
        }))
      );
    });
};
