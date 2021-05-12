import {Reference} from "./reference.model";
import {UserPreview} from "./user.model";
import {ImageDescriptor} from "./image-descriptor.model";

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
  images: ImageDescriptor[],
}

export interface ReviewBody {
  id: string,
  content: string,
  createdTimestamp: Date,
}

export enum ReviewVoteType { UP = "UP", DOWN = "DOWN"}

export interface ReviewVotes {
  upvotesCount: number,
  downvotesCount: number,
  own: {
    type: ReviewVoteType,
  } | null
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
