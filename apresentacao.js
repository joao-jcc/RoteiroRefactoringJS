// apresentacao.js
const { formatarMoeda } = require("./utils");


function gerarFaturaStr(fatura, calc) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    for (let apre of fatura.apresentacoes) {
      const peca = calc.repo.getPeca(apre);
      faturaStr += `  ${peca.nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
    }
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)}\n`;
    return faturaStr;
  }
  
  module.exports = gerarFaturaStr;
  