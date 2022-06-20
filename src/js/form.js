const form = document.querySelector("#form");
const inputCarModel = document.querySelector("#inputModelo");
const inputCarBrand = document.querySelector("#selectMarca");
const selectedBrand = inputCarBrand.options[inputCarBrand.selectedIndex].value;
const inputCarYear = document.querySelector("#inputAno");
const inputCarPrice = document.querySelector("#inputPreco");
const inputCarPhoto = document.querySelector("#inputFoto");
const inputCarColor = document.querySelector("#selectCor");
const selectedColor = inputCarColor.options[inputCarColor.selectedIndex].value;
const inputCarDescription = document.querySelector("#textareaDescricao");
const body = document.querySelector("body");
const modalUl = document.querySelector("#modalUl");

const localStoragecars = JSON.parse(localStorage.getItem("cars"));
let cars = localStorage.getItem("cars") !== null ? localStoragecars : [];

const updateLocalStorage = () => {
    localStorage.setItem("cars", JSON.stringify(cars));
};

const generateID = () => Math.round(Math.random() * 1000);

const addTocarsArray = (
    inputCarModel,
    selectedBrand,
    inputCarYear,
    inputCarPrice,
    inputCarPhoto,
    selectedColor,
    inputCarDescription
) => {
    cars.push({
        id: generateID(),
        model: inputCarModel,
        brand: selectedBrand,
        year: inputCarYear,
        price: inputCarPrice,
        photo: inputCarPhoto,
        color: selectedColor,
        description: inputCarDescription,
    });
};

const cleanInputs = () => {
    inputCarModel.value = "";
    inputCarBrand.selectedIndex = 0;
    inputCarYear.value = "";
    inputCarPrice.value = "";
    inputCarPhoto.value = "";
    inputCarColor.selectedIndex = 0;    
    inputCarDescription.value = "";
};

const handleFormSubmit = (event) => {
    event.preventDefault();

    const carModel = inputCarModel.value.trim();
    const carBrand = inputCarBrand.value.trim();
    const carYear = inputCarYear.value.trim();
    const carPrice = inputCarPrice.value.trim();
    const carPhoto = inputCarPhoto.value.trim();
    const carColor = inputCarColor.value.trim();
    const carDescription = inputCarDescription.value.trim();
    const isSomeInputEmpty =
        carModel === "" ||
        carBrand === "" ||
        carYear === "" ||
        carPrice === "" ||
        carColor === "" ||
        carDescription === "";

    const divModal = document.createElement("div");
    let Price = carPrice.replace(/[^\d]/g, '');
    Price = Price.slice(0, -2); 


    //Validação
    if (isSomeInputEmpty) {
        alert("Por favor, preencha os dados do veiculo!");
        return;
    }

    if(carModel.lenght <= 1){
        alert("Modelo de Carro deve possuir mais de 1 caractere");
        return;
    }

    if(carYear <= 1900){
        alert("O ano deve ser maior que 1900");
        return;
    }

    if((Price < 0) || (Price > 100000000)){
        alert("Preço não pode ser negativo e não pode ser maior que 100 milhões de reais");
        return;
    }


    addTocarsArray(
        carModel,
        carBrand,
        carYear,
        carPrice,
        carPhoto,
        carColor,
        carDescription
    );
    
    updateLocalStorage();

    divModal.innerHTML = `
    <div class="modal fade" id="modalSuccess" aria-hidden="true" aria-labelledby="modalSuccessLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalSuccessLabel">Sucesso</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p> Veículo cadastrado com sucesso.
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
            </div>
            </div>
        </div>
    </div>
    `;
    console.log(Price);
    modalUl.append(divModal);

    $('#modalSuccess').modal('show');

    cleanInputs();
};

form.addEventListener("submit", handleFormSubmit);
