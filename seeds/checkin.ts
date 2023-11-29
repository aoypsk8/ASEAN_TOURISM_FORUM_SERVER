exports.seed = function (knex: any) {
  const checkins = [
    {
      checkinid: 1,
      userid: 123,
      checkin_time: new Date("2023-01-01T09:00:00"),
    },
    {
        checkinid: 1,
        userid: 123,
        checkin_time: new Date("2023-01-01T09:00:00"),
      },
  ];

  return knex("checkins")
    .del()
    .then(function () {
      return knex("checkins").insert(
        checkins.map((checkin) => ({
          checkinid: checkin.checkinid,
          userid: checkin.userid,
          checkin_time: checkin.checkin_time,
        }))
      );
    });
};
