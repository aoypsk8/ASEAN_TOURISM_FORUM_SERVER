// Define an interface for the feed data
interface CheckInData {
    checkinid: number;
    userid: number;
    checkin_time: Date;
  }
  
  class CheckIn {
    checkinid: number;
    userid: number;
    checkin_time: Date;
  
    constructor(data: CheckInData) {
      this.checkinid = data.checkinid;
      this.userid = data.userid;
      this.checkin_time = data.checkin_time;
    }
  }
  
  export default CheckIn;
  