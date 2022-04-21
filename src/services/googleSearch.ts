import axios from "axios";

const seachApi = axios.create({
  baseURL: `https://www.googleapis.com/customsearch/v1/siterestrict?`,
});

export { seachApi };
