declare type Product = {
  "id": number,
  "product_name": string,
  "start_date": string,
  "end_date": string,
  "sources": string,
  "store": number
};

declare type Favorite = {
  "id": number,
  "user": number,
  "product": number
};