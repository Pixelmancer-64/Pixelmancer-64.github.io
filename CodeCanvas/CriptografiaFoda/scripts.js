isPrime = function (n) {
  if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
  if (n == leastFactor(n)) return true;
  return false;
};

leastFactor = function (n) {
  if (isNaN(n) || !isFinite(n)) return NaN;
  if (n == 0) return 0;
  if (n % 1 || n * n < 2) return 1;
  if (n % 2 == 0) return 2;
  if (n % 3 == 0) return 3;
  if (n % 5 == 0) return 5;
  var m = Math.sqrt(n);
  for (var i = 7; i <= m; i += 30) {
    if (n % i == 0) return i;
    if (n % (i + 4) == 0) return i + 4;
    if (n % (i + 6) == 0) return i + 6;
    if (n % (i + 10) == 0) return i + 10;
    if (n % (i + 12) == 0) return i + 12;
    if (n % (i + 16) == 0) return i + 16;
    if (n % (i + 22) == 0) return i + 22;
    if (n % (i + 24) == 0) return i + 24;
  }
  return n;
};

function fib(n) {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = document.getElementById("texto");
  const senha = document.getElementById("senha");

  let primeirinha;
  let ultimazona;
  if (isPrime(senha.value.length)) {
    primeirinha = senha.value.charCodeAt(0);
    ultimazona = senha.value.charCodeAt(senha.value.length - 1);
  } else {
    primeirinha = fib(
      fib(parseInt(senha.value.charCodeAt(0).toString().split("")[0]))
    );
    ultimazona = senha.value.charCodeAt(senha.value.length - 1);
  }

  console.log(primeirinha, ultimazona);
  let soma = 0;
  primeirinha
    .toString()
    .split("")
    .forEach((e) => {
      soma += parseInt(e);
    });

  ultimazona
    .toString()
    .split("")
    .forEach((e) => {
      soma += parseInt(e);
    });

  let textinho = [];

  for (let i = 0; i < texto.value.length; i++) {
    let letra = texto.value.charCodeAt(i);
    textinho[i] = String.fromCharCode(letra + soma);
  }
  
  textinho = textinho.join('')
  console.log(textinho);
  document.getElementById('r').innerHTML = textinho;
});