(function(){

    VMasker(document.getElementById("inputPreco")).maskMoney();
    VMasker(document.getElementById("inputAno")).maskNumber();
    VMasker(document.getElementById("inputAno")).maskPattern('9999');
})();