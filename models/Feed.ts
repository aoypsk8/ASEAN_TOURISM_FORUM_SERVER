// Define an interface for the feed data
interface FeedData {
  title: string;
  description: string;
  images: string[] | null;
  createdAt: Date;
}

class Feed {
  title: string;
  description: string;
  images: string[] | null;
  createdAt: Date;

  constructor(data: FeedData) {
    this.title = data.title;
    this.description = data.description;
    this.images = data.images;
    this.createdAt = data.createdAt;
  }
}

export default Feed;
