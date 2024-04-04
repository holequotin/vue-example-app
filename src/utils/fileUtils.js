function checkURL(url) {
  url = String(url)
  return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

export {checkURL}