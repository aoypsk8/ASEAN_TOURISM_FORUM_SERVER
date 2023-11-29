exports.seed = function (knex: any) {
  const feedcomments = [
    {
      feedid: 1,
      userid: 1,
      commenttext: "Good but it inot good enought !! ",
    },
    {
        feedid: 1,
        userid: 2,
        commenttext: "Good but it inot good enought !! ",
      },
      {
        feedid: 2,
        userid: 1,
        commenttext: "Good but it inot good enought !! ",
      },
      {
        feedid: 3,
        userid: 2,
        commenttext: "Good but it inot good enought !! ",
        
      },
      {
        feedid: 2,
        userid: 1,
        commenttext: "Good but it inot good enought !! ",
        
      },
      {
        feedid: 3,
        userid: 1,
        commenttext: "Good but it inot good enought !! ",
        
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
        }))
      );
    });
};
