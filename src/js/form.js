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

    if (isSomeInputEmpty) {
        alert("Por favor, preencha os dados do veiculo!");
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

    cleanInputs();
};

form.addEventListener("submit", handleFormSubmit);
