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
      { timeout: 7000 }
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
      timeout: 7000,
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

export async function getImages(title) {
  try {
    const response = await fetchWithTimeout(
      endpoint + "photo-albums?populate[0]=images",
      {
        timeout: 7000,
      }
    );
    const responseJson = await response.json();
    const allAlbums = responseJson.data;
    const targetAlbum = allAlbums.find(
      (object) => object.attributes.title == title
    );
    const imageDataArray = targetAlbum.attributes.images.data;
    const imagesArray = imageDataArray.map(
      (item) => "https://gvc-cms.onrender.com" + item.attributes.url
    );

    return imagesArray;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}
