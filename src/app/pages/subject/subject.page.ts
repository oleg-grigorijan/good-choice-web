import {Component, OnInit} from '@angular/core';
import {Review, ReviewVoteType} from "../../models/review.model";
import {ReviewService} from "../../services/review.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subj} from "../../models/subject.model";
import {SubjectService} from "../../services/subject.service";
import {Reference} from "../../models/reference.model";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styles: []
})
export class SubjectPage implements OnInit {

  subjectId!: string;
  subject?: Subj;
  reviews: Review[] = [];

  constructor(
    private readonly subjectService: SubjectService,
    private readonly reviewService: ReviewService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.subjectId = this.route.snapshot.paramMap.get('subjectId')!;
    this.subjectService.getById(this.subjectId).subscribe(subject => {
      this.subject = subject;
    })
    this.reviewService.getPageBySubject(this.subjectId, 0, 20).subscribe(page => {
      this.reviews = page.items;
    });
  }

  onReviewCreation(reference: Reference): void {
    // TODO: Update page
  }

  onVoteClick(review: Review, type: ReviewVoteType) {
    let voting$ = review.votes.own?.type === type
      ? this.reviewService.removeVote(review.id)
      : this.reviewService.vote(review.id, type);
    voting$.subscribe(votes => {
      this.reviews.find(it => it.id === review.id)!.votes = votes;
    })
  }
}
