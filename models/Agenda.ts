interface AgendaData {
    title: string;
    description: string;
    start_time: Date;
    end_time: Date;
    location: string;
    createdAt: Date;
  }
  
  class Agenda {
    title: string;
    description: string;
    start_time: Date;
    end_time: Date;
    location: string;
    createdAt: Date;
  
    constructor(data: AgendaData) {
      this.title = data.title;
      this.description = data.description;
      this.start_time = data.start_time;
      this.end_time = data.end_time;
      this.location = data.location;
      this.createdAt = data.createdAt;
    }
  }
  
  export default Agenda;
  