import { useSanityClient, groq } from "astro-sanity";

//Sanity
// export async function getArticles() {
//   const query = groq`*[_type == "article"]`;
//   const articles = await useSanityClient().fetch(query);
//   return articles;
// }

//Strapi
export async function getArticle(title) {
  const response = await fetch(
    "http://localhost:1337/api/articles?filters[title][$eqi]=" + title
  );
  const data = await response.json();
  const content = data.data[0].attributes.content;
  return content;
}

export async function getBulletin() {
  const response = await fetch("http://localhost:1337/api/bulletins");
  const data = await response.json();

  const dateStr = data.data[0].attributes.date;
  const date = new Date(dateStr);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  const serviceOrder = data.data[0].attributes.serviceOrder;
  const announcements = data.data[0].attributes.announcements;

  return [formattedDate, serviceOrder, announcements];
}
