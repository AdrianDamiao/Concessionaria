(function(){
    VMasker(document.getElementById("inputPreco")).maskMoney({
        precision: 2,
        separator: ',',
        zeroCents: true,
        unit: 'R$',
        delimiter: '.'});
    VMasker(document.getElementById("inputAno")).maskNumber();
    VMasker(document.getElementById("inputAno")).maskPattern('9999');
    VMasker(document.getElementById("inputPreco")).maskPattern('99.999.999,99');
})();