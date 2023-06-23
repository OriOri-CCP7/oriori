declare type Product = {
  "id"?: number,
  "product_name": string,
  "start_date"?: string,
  "end_date"?: string,
  "location": number[],
  "img_url": string,
  "link_url": string
};

declare type Bookmark = {
  "id": number,
  "user": number,
  "product": number
};

declare type Log = {
  "id": number,
  "user": number,
  "product": number,
  "liked_it": boolean
};