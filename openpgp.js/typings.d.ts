// openpgp js does have types - outdated. Quick hack to silence complier for example only
declare module 'openpgp' {
  const y: any;
  export = y;
}