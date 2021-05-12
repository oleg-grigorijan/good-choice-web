import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Review, ReviewVoteType} from "../../models/review.model";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.sass']
})
export class ReviewCardComponent {

  @Input()
  review!: Review;

  @Output()
  voteClick: EventEmitter<ReviewVoteType> = new EventEmitter<ReviewVoteType>();

  onUpvoteClick() {
    this.voteClick.emit(ReviewVoteType.UP);
  }

  onDownvoteClick() {
    this.voteClick.emit(ReviewVoteType.DOWN);
  }
}
