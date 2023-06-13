declare type Product = {
  "id": number,
  "product_name": string,
  "start_date": string,
  "end_date": string,
  "store": number,
  "img_url": string,
  "link_url": string
};

declare type Favorite = {
  "id": number,
  "user": number,
  "product": number
};