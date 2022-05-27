(function(){
    VMasker(document.getElementById("inputPreco")).maskMoney({
        separator: ',',
        delimiter: '.'});
    VMasker(document.getElementById("inputAno")).maskNumber();
    VMasker(document.getElementById("inputAno")).maskPattern('9999');
})();