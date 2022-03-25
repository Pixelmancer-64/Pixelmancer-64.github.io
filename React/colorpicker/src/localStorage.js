export default class LocalStorage {
  static getData(name) {
    const response = localStorage.getItem(name) 
    if (!response) return [];
    return JSON.parse(response);
  }

  static add(name, item) {
    const response = LocalStorage.getData(name);

    response.push(item);

    localStorage.setItem(name, JSON.stringify(response));
  }
  static remove(item, key) {
    const response = LocalStorage.getData();
    response.forEach((e, i) => {
      if (e[key] === item) {
        response.splice(i, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(response));
  }
}