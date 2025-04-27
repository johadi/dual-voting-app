export interface Comment {
  profileImage: string | null;
  id: string;
  content: string;
  username: string;
  createdAt: string;
}

export interface Post {
  id: string;
  imageA: string;
  imageB: string;
  votesA: number;
  votesB: number;
  comments: Comment[];
}