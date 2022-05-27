const carsUl = document.querySelector("#cars");
const modalUl = document.querySelector("#modalUl");
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
    const divModal = document.createElement("div");

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
                    <p><strong>Preço:</strong> R$ ${price}</p>
                    <p><strong>Cor:</strong> ${color}</p>
                    <p><strong>Ano:</strong> ${year}</p>
                    <p>${description}</p>
                  </div>
                  <div class="col-10 d-flex gap-2 justify-content-end">
                    <button type="button" class="btn btn-primary" onClick="editcar(${id})">
                        Editar
                    </button>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalConfirm">
                        Excluir
                    </button>
              </div>
          </div>
      </div>
    `;

    divModal.innerHTML = `
    <div class="modal fade" id="modalConfirm" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalConfirmLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalConfirmLabel">Excluir Veículo</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p> Você tem certeza que deseja excluir o veículo ${model}?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-dismiss="modal" data-bs-target="#modalSuccess" onClick="removecar(${id})">Excluir</button>
                            </div>
                            </div>
                        </div>
                    </div>
                  </div>
    <div class="modal fade" id="modalSuccess" aria-hidden="true" aria-labelledby="modalSuccessLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalSuccessLabel">Sucesso!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p> Veículo ${model} excluído com sucesso.
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
            </div>
            </div>
        </div>
    </div>
    `;

    carsUl.append(div);
    modalUl.append(divModal);
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
