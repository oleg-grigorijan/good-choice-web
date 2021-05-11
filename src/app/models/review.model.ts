import {Reference} from "./reference.model";
import {UserPreview} from "./user.model";

export interface Review {
  id: string,
  title: string,
  subject: Reference,
  author: UserPreview,
  mark: number,
  advantages: string[],
  disadvantages: string[],
  bodies: ReviewBody[],
  votes: ReviewVotes,
}

export interface ReviewBody {
  id: string,
  content: string,
  createdTimestamp: Date,
}

export enum ReviewVoteType { UP, DOWN}

export interface ReviewVotes {
  upvotesCount: number,
  downvotesCount: number,
  own: {
    type: ReviewVoteType,
  }
}

export interface ReviewCreationRequest {
  title: string,
  subject: Reference,
  advantages: string[],
  disadvantages: string[],
  mark: number,
  body: {
    content: string,
  },
  images: Reference[],
}
