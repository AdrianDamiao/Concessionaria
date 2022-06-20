const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const form = document.querySelector("#form");
const inputCarModel = document.querySelector("#inputModelo");
const inputCarBrand = document.querySelector("#selectMarca");
const inputCarYear = document.querySelector("#inputAno");
const inputCarPrice = document.querySelector("#inputPreco");
const inputCarPhoto = document.querySelector("#inputFoto");
const inputCarColor = document.querySelector("#selectCor");
const inputCarDescription = document.querySelector("#textareaDescricao");

const onEdit = () => {
    const localStorageCars = JSON.parse(localStorage.getItem("cars"));

    const car = localStorageCars.find((car) => car.id === parseInt(id))
    document.getElementById("selectMarca").value = car.brand;
    document.getElementById("inputModelo").value = car.model;
    document.getElementById("inputAno").value = car.year;
    document.getElementById("inputPreco").value = car.price;
    document.getElementById("inputFoto").value = car.photo;
    document.getElementById("selectCor").value = car.color;
    document.getElementById("textareaDescricao").value = car.description;
}

const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const carId = id;
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
    let Price = carPrice.replace(/[^\d]/g, '');
    Price = Price.slice(0, -2);


    //Validação
    if (isSomeInputEmpty) {
        alert("Por favor, preencha os dados do veiculo!");
        return;
    }

    if (carModel.lenght <= 1) {
        alert("Modelo de Carro deve possuir mais de 1 caractere");
        return;
    }

    if (carYear <= 1900) {
        alert("O ano deve ser maior que 1900");
        return;
    }

    if ((Price < 0) || (Price > 100000000)) {
        alert("Preço não pode ser negativo e não pode ser maior que 100 milhões de reais");
        return;
    }

    updateCar(
        carId,
        carModel,
        carBrand,
        carYear,
        carPrice,
        carPhoto,
        carColor,
        carDescription
    );
};

const updateCar = (
    carId,
    inputCarModel,
    selectedBrand,
    inputCarYear,
    inputCarPrice,
    inputCarPhoto,
    selectedColor,
    inputCarDescription
) => {
    const localStoragecars = JSON.parse(localStorage.getItem("cars"));
    const cars = localStoragecars.map((car) =>
        car.id === parseInt(carId) ? {
            id: parseInt(carId),
            model: inputCarModel,
            brand: selectedBrand,
            year: inputCarYear,
            price: inputCarPrice,
            photo: inputCarPhoto,
            color: selectedColor,
            description: inputCarDescription
        } : car
    );

    localStorage.setItem("cars", JSON.stringify(cars));

    window.location.href = '../pages/listagem.html';
};


form.addEventListener("submit", handleEditFormSubmit);
