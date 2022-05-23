const carsUl = document.querySelector("#cars");
const localStoragecars = JSON.parse(localStorage.getItem("cars"));
let cars = localStorage.getItem("cars") !== null ? localStoragecars : [];

const addcarIntoDom = ({
    id,
    model,
    brand,
    year,
    price,
    color,
    photo,
    description,
}) => {
    const div = document.createElement("div");

    if (!photo) {
        photo = "default";
    }

    div.classList.add("card", "m-3");
    div.innerHTML = `
      <div class="row g-3">
          <div class="col-md-4 text-center">
              <img src="../src/fotos/${photo}.jpg" class="img-thumbnail m-3">
          </div>
          <div class="col-md-8">
              <div class="card-body">
                  <h2 class="card-title">${model}</h2>
                  <div class="card-text">
                    <p><strong>Marca:</strong> ${brand}</p>
                    <p><strong>Preço:</strong> ${price}</p>
                    <p><strong>Cor:</strong> ${color}</p>
                    <p><strong>Ano:</strong> ${year}</p>
                    <p>${description}</p>
                  </div>
                  <div class="col-10 d-flex gap-2 justify-content-end">
                    <button type="button" class="btn btn-primary" onClick="editcar(${id})">
                        Editar
                    </button>
                    <button type="button" class="btn btn-danger" onClick="removecar(${id})">
                        Excluir
                    </button>
                  </div>
              </div>
          </div>
      </div>
    `;
    carsUl.append(div);
};

const updateLocalStorage = () => {
    localStorage.setItem("cars", JSON.stringify(cars));
};

const removecar = (ID) => {
    cars = cars.filter((car) => car.id !== ID);
    updateLocalStorage();
    init();
};

const init = () => {
    carsUl.innerHTML = "";
    cars.forEach(addcarIntoDom);
};

init();
