# Instalando Truffle

## Windows 10
Abra o terminal na pasta do projeto ou caminhe até ela  
Terminal > `npm -g install truffle`  
(Instalação *global* pois *local* cria complicações no futuro)  

Verifique se o seu truffle está funcionando  
Abra o terminal na pasta do projeto ou caminhe até ela  
Terminal > `truffle`  

Se apareceu `truffle: The term 'truffle' is not recognized as the name...`  
Em vez de `truffle` nos comandos, utilize `./node_modules/.bin/truffle`  
Ex: `truffle compile` vai virar `./node_modules/.bin/truffle compile`  

### Box
Truffle tem o conceito de Box para integrar Truffle com as outras Frameworks.  
Lista das Box: https://truffleframework.com/boxes  
Estou utilizando a Box para **React**  

Abra o terminal na pasta do projeto ou caminhe até ela   
Terminal > `truffle unbox react`  

Erros conhecidos:  
* Git não está no PATH do Windows
* Python 2 não estar instalado: https://www.python.org/downloads/release/python-2716/
* VS Build Tools não estar instalado/atualizado: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2017  

### Running
Abra o terminal na pasta do projeto ou caminhe até ela   
Terminal > `truffle compile` > `truffle migrate` > `cd client` > `npm run start`  

## Ubuntu
Abra o terminal na pasta do projeto ou caminhe até ela   
Terminal > `npm install truffle@5.0.19`  
(Instalação *local* pois *global* cria complicações no futuro)  

Verifique se o seu truffle está funcionando  
Abra o terminal na pasta do projeto ou caminhe até ela  
Terminal > `truffle`  

Se apareceu `truffle: command not found`  
Em vez de `truffle` nos comandos, utilize `./node_modules/.bin/truffle`  
Ex: `truffle compile` vai virar `./node_modules/.bin/truffle compile`

### Box
Truffle tem o conceito de Box para integrar Truffle com as outras Frameworks.  
Lista das Box: https://truffleframework.com/boxes  
Estou utilizando a Box para **React**  

Abra o terminal na pasta do projeto ou caminhe até ela   
Terminal > `truffle unbox react`  

Se aparecer que falhou em dar `cd client && npm install`  
Abra o terminal na pasta do projeto ou caminhe até ela   
Terminal > `cd client` > `npm install` > `npm audit fix`

Se aparecer o erro com cdigo EISGIT  
Terminal > `rm -rf node_modules/websocket/.git` > `npm install` > `npm audit fix` > `cd ..`  

### Running
Abra o terminal na pasta do projeto ou caminhe até ela   
Terminal > `truffle compile` > `truffle migrate` > `cd client` > `npm run start`  

Se aparecer um erro relacionado ao **react-scripts**  
Terminal > `rm -rf node_modules/react-scripts/` > `npm install` > `npm audit fix` > `npm run start`  
