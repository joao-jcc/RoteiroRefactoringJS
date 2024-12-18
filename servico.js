// arquivo servico.js
const { readFileSync } = require('fs');

const { formatarMoeda } = require("./utils");

module.exports = class ServicoCalculoFatura {
    constructor(repo) {
      this.repo = repo;
    }
  
    calcularCredito(apre) {
      let creditos = 0;
      creditos += Math.max(apre.audiencia - 30, 0);
      if (this.repo.getPeca(apre).tipo === "comedia") {
        creditos += Math.floor(apre.audiencia / 5);
      }
      return creditos;
    }
  
    calcularTotalCreditos(apresentacoes) {
      let totalCredito = 0;
      for (let apre of apresentacoes) {
        totalCredito += this.calcularCredito(apre);
      }
      return totalCredito;
    }
  
    calcularTotalApresentacao(apre) {
      let total = 0;
      const peca = this.repo.getPeca(apre);
  
      switch (peca.tipo) {
        case "tragedia":
          total = 40000;
          if (apre.audiencia > 30) {
            total += 1000 * (apre.audiencia - 30);
          }
          break;
        case "comedia":
          total = 30000;
          if (apre.audiencia > 20) {
            total += 10000 + 500 * (apre.audiencia - 20);
          }
          total += 300 * apre.audiencia;
          break;
        default:
          throw new Error(`Peça desconhecida: ${peca.tipo}`);
      }
      return total;
    }
  
    calcularTotalFatura(apresentacoes) {
      let totalFatura = 0;
      for (let apre of apresentacoes) {
        totalFatura += this.calcularTotalApresentacao(apre);
      }
      return totalFatura;
    }
  }