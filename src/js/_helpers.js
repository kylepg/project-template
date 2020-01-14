export async function multiFetch(endpoints) {
  const promises = [];
  endpoints.forEach((endpoint) => {
    let url = endpoint.live;
    if (window.location.href.includes(`localhost`) || url.includes(`.loc`) || url.includes(`10.10.226`)) {
      url = endpoint.local;
    }
    promises.push(fetch(url).then(res => res.json()).catch(() => {
      if (endpoint.fallback !== undefined) {
        return fetch(endpoint.fallback).then(res => res.json());
      }
      console.error(`No fallback defined for ${url}. Returning blank JSON.`);
      return {};
    }));
  });
  const returnObj = {};
  await Promise.all(promises).then((data) => {
    data.forEach((d, i) => {
      returnObj[endpoints[i].name] = d;
    });
  });
  return returnObj;
}


export default () => {};

