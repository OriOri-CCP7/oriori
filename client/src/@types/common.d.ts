declare type Product = {
  "id": number,
  "product_name": string,
  "start_date": string,
  "end_date": string,
  "store": number,
  "img_url": string | null,
  "link_url": string | null
};

declare type Favorite = {
  "id": number,
  "user": number,
  "product": number
};

declare type Review = {
  "id": number,
  "user": number,
  "product": number,
  "rating": 0 | 1 | 1,
  "comment": string 
};