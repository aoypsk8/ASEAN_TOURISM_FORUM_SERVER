// Define an interface for the feed data
interface FeedCommentData {
    feedid: number;
    userid: number;
    commenttext: string;
    createdAt: Date;
  }
  
  class FeedComment {
    feedid: number;
    userid: number;
    commenttext: string;
    createdAt: Date;
  
    constructor(data: FeedCommentData) {
      this.feedid = data.feedid;
      this.userid = data.userid;
      this.commenttext = data.commenttext;
      this.createdAt = data.createdAt;
    }
  }
  
  export default FeedComment;
  