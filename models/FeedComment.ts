// Define an interface for the feed data
interface FeedCommentData {
    feedid: number;
    userid: number;
    commenttext: string;

  }
  
  class FeedComment {
    feedid: number;
    userid: number;
    commenttext: string;

  
    constructor(data: FeedCommentData) {
      this.feedid = data.feedid;
      this.userid = data.userid;
      this.commenttext = data.commenttext;
    }
  }
  
  export default FeedComment;
  