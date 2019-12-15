function fetchData(url, options) {
  return fetch(url, options).then(res => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  });
}

export { fetchData };
