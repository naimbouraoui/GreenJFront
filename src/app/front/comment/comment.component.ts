import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../../models/Coment.model';
import { CommentService } from '../../services/comment.service';



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  inputs: ['comment']
})
export class CommentComponent implements OnInit {

  comments: Comment[] = [];
  commentForm: FormGroup;
  publicationId = 123;
  

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {
    this.commentForm = this.formBuilder.group({
      id: [],
      content: ['', Validators.required],
      publicationId: ['', Validators.required]
    });
    
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.commentService.getAllComments().subscribe(comments => this.comments = comments);
  }

  addComment(): void {
    const newComment = this.commentForm.value as Comment;
    this.commentService. addComments(newComment).subscribe(comment => {
      this.commentForm.reset();
      this.comments.push(comment);
    });
  }

  deleteComment(id: number): void {
    this.commentService.deleteComments(id).subscribe(() => {
      this.comments = this.comments.filter(comment => comment.id !== id);
    });
  }

  updateComment(comment: Comment): void {
    this.commentService.updateComments(comment).subscribe(updatedComment => {
      const index = this.comments.findIndex(c => c.id === updatedComment.id);
      this.comments[index] = updatedComment;
    });
  }

  cancelEdit(): void {
    this.commentForm.reset();
  }

  getComment(id: number): void {
    this.commentService.getComment(id).subscribe(comment => this.commentForm.patchValue(comment));
  }

  addCommentToPublication(commentFormValue: any): void {
    const publicationId = commentFormValue.publicationId;
    const content = commentFormValue.content;
    const newComment = { id: 0, dateComment: new Date(), content } as Comment;
    this.commentService.addCommentToPublication(publicationId, newComment).subscribe(comment => {
      this.commentForm.reset();
      this.comments.push(comment);
    });
  }
  
  

}
