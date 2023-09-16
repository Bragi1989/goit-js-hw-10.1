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

const breedSelect = document.querySelector(".breed-select");
  const catInfoDiv = document.querySelector(".cat-info");
  const loader = document.querySelector(".loader");
  const errorEl = document.querySelector(".error");

// Головна функція, яка викликається при виборі породи в селекті
function handleBreedSelection() {
    const selectedBreedId = breedSelect.value;

  // Показуємо завантажувач
  loader.style.display = "block";
  errorEl.style.display = "none";

  // Отримуємо інформацію про кота за породою
  fetchCatByBreed(selectedBreedId)
    .then((catData) => {
      // Приховуємо завантажувач
      loader.style.display = "none";

      // Виводимо інформацію про кота
      catInfoDiv.innerHTML = `
        <img src="${catData.url}" alt="Кіт">
        <p><strong>Назва породи:</strong> ${catData.breeds[0].name}</p>
        <p><strong>Опис:</strong> ${catData.breeds[0].description}</p>
        <p><strong>Темперамент:</strong> ${catData.breeds[0].temperament}</p>
      `;
    })
    .catch((error) => {
      // Приховуємо завантажувач та виводимо повідомлення про помилку
      loader.style.display = "none";
      errorEl.style.display = "block";
    });
}

// Отримуємо селект-елемент для вибору породи


// Додаємо обробник події для вибору породи
breedSelect.addEventListener("change", handleBreedSelection);

// Початкова загрузка порід котів при завантаженні сторінки
fetchBreeds()
  .then((breeds) => {
    // Наповнюємо селект-елемент опціями
    breedSelect.innerHTML = breeds.map((breed) => `<option value="${breed.id}">${breed.name}</option>`).join("");
    breedSelect.classList.remove("is-hidden");
  })
  .catch((err) => {
    alert("Помилка при завантаженні порід котів:");

    errorEl.style.display = "block";
  }).finally(() => {
    loader.classList.add("is-hidden");
  });