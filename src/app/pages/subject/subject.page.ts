import {Component, OnInit} from '@angular/core';
import {Review, ReviewVoteType} from "../../models/review.model";
import {ReviewService} from "../../services/review.service";
import {ActivatedRoute} from "@angular/router";
import {Subj} from "../../models/subject.model";
import {SubjectService} from "../../services/subject.service";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styles: []
})
export class SubjectPage implements OnInit {

  subjectId!: string;
  subject: Subj | null = null;
  ownReview: Review | null = null;
  reviews: Review[] = [];

  constructor(
    private readonly subjectService: SubjectService,
    readonly reviewService: ReviewService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.subjectId = this.route.snapshot.paramMap.get('subjectId')!;
    this.subjectService.getById(this.subjectId).subscribe(subject => {
      this.subject = subject;
    })
    if (this.reviewService.canCreate()) {
      this.loadOwnReview();
    }
    this.reviewService.getPageBySubject(this.subjectId, 0, 20).subscribe(page => {
      this.reviews = page.items;
    });
  }

  loadOwnReview(): void {
    this.reviewService.getOwnBySubject(this.subjectId).subscribe(review => {
      this.ownReview = review;
    }, error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.ownReview = null;
      } else {
        throwError(error);
      }
    });
  }

  onVoteClick(review: Review, type: ReviewVoteType) {
    let voting$ = review.votes.own?.type === type
      ? this.reviewService.removeVote(review.id)
      : this.reviewService.vote(review.id, type);
    voting$.subscribe(votes => {
      review.votes = votes;
    })
  }
}
