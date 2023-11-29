exports.seed = function (knex: any) {
  const agendas = [
    {
      title: "Meeting Title",
      description: "Discuss important topics",
      start_time: new Date("2023-01-01T09:00:00"),
      end_time: new Date("2023-01-01T10:30:00"),
      location: "Conference Room A",
      createdAt: new Date(),
    }
  ];

  return knex("agendas")
    .del()
    .then(function () {
      return knex("agendas").insert(
        agendas.map((agenda) => ({
          title: agenda.title,
          description: agenda.description,
          start_time: agenda.start_time,
          end_time: agenda.end_time,
          location: agenda.location,
          created_at: agenda.createdAt,
          updated_at: agenda.createdAt,
        }))
      );
    });
};
