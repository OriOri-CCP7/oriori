declare type Product = {
  "id": number,
  "product_name": string,
  "start_date"?: string,
  "end_date"?: string,
  "store": number,
  "img_url": string | null,
  "link_url": string | null
};

declare type Bookmark = {
  "id": number,
  "user": number,
  "product": number
};

declare type Log = {
  "id": number,
  "user": number,
  "product": number
};