# Novo Contrato

* Dentro da pasta do seu projeto procure pela pasta **contracts**  
* Bote seu contrato .sol nessa pasta
  * Exemplo: `Samples.sol`
* Dentro da pasta do seu projeto procure pela pasta **migrations**
* Crie um arquivo novo com o nome que deseja
  * Exemplo: `3_samples_contracts.js`
* O conteudo é parecido com os default mas altere para o seu contrato
  * Exemplo: 
  ```Javascript
  var Samples = artifacts.require("./Samples.sol");

  module.exports = function(deployer) {
    deployer.deploy(Samples);
  };
  ```
* Recompile truffle, migre e rode
  * `truffle compile --all`
  * `truffle migrate --reset`
  * `cd client`
  * `npm run start`
  
Obs: Não sei se era necessário o --all e --reset
