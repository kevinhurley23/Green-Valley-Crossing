const endpoint = "https://gvc-cms.onrender.com/api/";

function fetchWithTimeout(resource, options) {
  const { timeout = 7000 } = options;

  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Request timed out")),
      timeout
    );

    fetch(resource, options).then((response) => {
      clearTimeout(timer);
      resolve(response);
    }, reject);
  });
}

export async function getArticle(title) {
  try {
    const response = await fetchWithTimeout(
      endpoint + "articles?filters[title][$eqi]=" + title,
      { timeout: 15000 }
    );
    const data = await response.json();
    const content = data.data[0].attributes.content;
    return content;
  } catch (error) {
    console.error("Error fetching article:", error);
    return `<p class="error-message">The requested resource could not be loaded<p>`;
  }
}

export async function getBulletin() {
  try {
    const response = await fetchWithTimeout(endpoint + "bulletins", {
      timeout: 15000,
    });
    const data = await response.json();

    const dateStr = data.data[0].attributes.date;
    const date = new Date(dateStr);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    const serviceOrder = data.data[0].attributes.service_order;
    const announcements = data.data[0].attributes.announcements;

    return [formattedDate, serviceOrder, announcements];
  } catch (error) {
    console.error("Error fetching bulletin:", error);
    return `<p class="error-message">The requested resource could not be loaded<p>`;
  }
}
