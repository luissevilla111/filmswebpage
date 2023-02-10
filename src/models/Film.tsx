export interface Film {
  Saga: string;
  Name: string;
  Added_Time_Utc: string;
  Description: string;
  Duration_Minutes: string;
  Genders: string[];
  Image_Url: string;
  Stars: Number;
}

export interface FilmAdd {
  saga: string;
  name: string;
  addedTimeUtc: string;
  description: string;
  durationMinutes: string;
  genders: string[];
  imageUrl: string;
  stars: Number;
}

export interface ILastKey {
  Saga: String;
  Name: String;
}

export interface GetFilmsResponse {
  films: Film[];
  message: String;
  lastKey: ILastKey;
}

export interface SweetAlert {
  icon: "warning" | "error" | "success" | "info";
  title: string;
  text: string;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
}
