import { Reaction } from './Reaction.model';
import { Comment } from './Coment.model';
export interface Publication {
  id: number;
  pubDate: Date;
  content: string;
  reactions: Reaction[];
  comments: Comment[];
  showComments: boolean; // new property
}