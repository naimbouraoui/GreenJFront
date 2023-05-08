import * as timers from "timers";
import {ActivityType} from "./activity-type";
import {Review} from "./review";

export class Activity {
  idActivity?: any;
  name?: any;
  region?: any;
  description?: any;
  address?: any;
  image?: any;
  acDate?: Date;
  acTime?: Date;
  type?: String;
  reviews ?: Review ;
}
