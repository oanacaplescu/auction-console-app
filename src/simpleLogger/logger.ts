export function log(message: string, data?: Object) {
  console.log(message);
  data && console.log(JSON.stringify(data));
}
