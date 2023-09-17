
import { fetchBreeds } from "./js/catapi.js";
import { fetchCatByBreed } from "./js/catapi.js";

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
  })
  .finally(() => {
    loader.classList.add("is-hidden");
  });