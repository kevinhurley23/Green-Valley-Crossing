const endpoint = "https://gvc-cms.onrender.com/api/";
export async function getArticle(title) {
  const response = await fetch(
    endpoint + "articles?filters[title][$eqi]=" + title
  );
  const data = await response.json();
  const content = data.data[0].attributes.content;
  return content;
}

export async function getBulletin() {
  const response = await fetch(endpoint + "bulletins");
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

  const serviceOrder = data.data[0].attributes.service_order;
  const announcements = data.data[0].attributes.announcements;

  return [formattedDate, serviceOrder, announcements];
}
