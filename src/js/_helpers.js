export async function multiFetch(endpoints) {
  const promises = [];
  endpoints.forEach((endpoint) => {
    let url = endpoint.live;
    if (window.location.href.includes(`localhost`) || url.includes(`.loc`) || url.includes(`10.10.226`)) {
      url = endpoint.local;
    }
    promises.push(fetch(url).then(res => res.json()));
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

