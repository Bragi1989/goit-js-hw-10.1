import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_oV6kwsCqQVuQJ1iOyl3IgPQ7tqy3GRldQQaEXehjgn3EctfIACfRB1n8lbnQseE9";

// Функція для отримання списку порід котів
export function fetchBreeds() {
  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Помилка при завантаженні порід котів:", error);
      throw error;
    });
}

// Функція для отримання інформації про кота за ідентифікатором породи
export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => response.data[0])
    .catch((error) => {
      console.error("Помилка при отриманні інформації про кота:", error);
      throw error;
    });
}