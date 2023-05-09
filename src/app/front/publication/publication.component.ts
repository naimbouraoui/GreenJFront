import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Publication } from '../../models/Publication.model';
import { PublicationService } from '../../services/publication.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/Coment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reaction } from '../../models/Reaction.model';
import { React } from '../../models/React.enum';



@Component({
  selector: 'app-publications',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css',
]
})
export class PublicationComponent implements OnInit {
  publications: Publication[] = [];
  selectedPublication: Publication | null = null;
  commentForm: FormGroup;
  comments: Comment[] = [];
  newPublicationContent: string = "";
  showAddCommentForm: boolean = false;
  newCommentContent: string = ''; // add an empty string initializer
  selectedReactionType: React = React.Love;






toggleAddCommentForm() {
  this.showAddCommentForm = !this.showAddCommentForm;
}


  @ViewChild('publicationForm') publicationForm!: NgForm; // Reference to the form instance

  constructor(private publicationService: PublicationService, private commentService: CommentService,private formBuilder: FormBuilder) {this.commentForm = this.formBuilder.group({
    id: [],
    content: ['', Validators.required],
    publicationId: ['', Validators.required]
  });}

  ngOnInit(): void {
    this.getPublications();
  }

  getPublications(): void {
    console.log('Getting all publications...');
    this.publicationService.getAllPublications().subscribe(publications => {
      console.log(`Received ${publications.length} publications.`);
      this.publications = publications;
      this.publications.forEach(publication => {
        console.log(`Getting comments for publication ${publication.id}...`);
        this.commentService.getComments(publication.id).subscribe(comments => {
          console.log(`Received ${comments.length} comments for publication ${publication.id}.`);
          publication.comments = comments;
        });
      });
    });
  }


  addPublication(): void {
    const publication: Publication = {
      id: 0,
      pubDate: new Date(),
      content: this.newPublicationContent,
      reactions: [],
      comments: [],
      showComments: false, // new property
    };
    console.log("Adding publication:", publication);
    this.publicationService.addPublication(publication).subscribe(newPublication => {
      console.log("New publication added:", newPublication);
      this.publications.push(newPublication);
      this.newPublicationContent = "";
    });
  }

  deletePublication(publicationId: number): void {
    this.publicationService.deletePublication(publicationId).subscribe(() => {
      // Remove the deleted publication from the array
      this.publications = this.publications.filter(publication => publication.id !== publicationId);
    });
  }

  updatePublication(publication: Publication): void {
    console.log('Selected publication before update:', this.selectedPublication);
    this.selectedPublication = publication;
    console.log('Selected publication after update:', this.selectedPublication);
  }

  savePublication(): void {
    if (!this.selectedPublication) {
      return;
    }

    console.log('Selected publication before save:', this.selectedPublication);
    this.publicationService.updatePublication(this.selectedPublication).subscribe(updatedPublication => {
      console.log('Selected publication after save:', updatedPublication);
      // Find the index of the updated publication in the array
      const index = this.publications.findIndex(p => p.id === updatedPublication.id);
      // Replace the old publication with the updated publication
      this.publications[index] = updatedPublication;
      // Clear the selected publication and reset the form
      this.cancelEdit();
    });
  }

  showComments(publicationId: number) {
    console.log('Retrieving comments for publication with ID', publicationId);
    this.commentService.getComments(publicationId).subscribe(
      (data: Comment[]) => {
        console.log('Received comments:', data);
        this.comments = data;
      },
      (error: any) => {
        console.log('Error occurred while retrieving comments:', error);
      }
    );
  }



  cancelEdit(): void {
    this.selectedPublication = null; // clear the selected publication
    this.publicationForm.resetForm(); // reset the form
  }
  addCommentToPublication(publicationId: number, content: string): void {
    const newComment = { id: 0, dateComment: new Date(), content } as Comment;
    this.commentService.addCommentToPublication(publicationId, newComment).subscribe(comment => {
      this.newCommentContent = '';
      this.publications.forEach(publication => {
        if (publication.id === publicationId) {
          publication.comments.push(comment);
          publication.showComments = true;
        }
      });
    });
  }

  addReactionToPublication(publicationId: number, reaction: React) {
    this.publicationService.addReactionToPublication(publicationId, reaction).subscribe(() => {
      console.log('Reaction added successfully');
    }, error => {
      console.log('Error adding reaction: ', error);
    });
  }

}
