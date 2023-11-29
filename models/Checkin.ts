// Define an interface for the feed data
interface CheckInData {
    checkinid: number;
    userid: number;
  }
  
  class CheckIn {
    checkinid: number;
    userid: number;
  
    constructor(data: CheckInData) {
      this.checkinid = data.checkinid;
      this.userid = data.userid;
    }
  }
  
  export default CheckIn;
  