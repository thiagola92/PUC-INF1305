# Instalando Ganache 

## Windows 10
Baixe e instale Ganache: https://truffleframework.com/ganache  
Se o seu windows 10 não reconhecer o formato .appx você precisa instalar **App Installer** na **Microsoft Store**  
    
## Ubuntu
Baixe e abra o Ganache: https://truffleframework.com/ganache  
Para abrir o formato **.AppImage** você precisa tornar executável (right click > permissions > allow executing file as program)  
# Instalando Metamask

## Chrome
Instale a extensão Metamask para o Chrome: https://metamask.io/  
Você preicsa se registrar no Metamask e salvar em algum lugar seguro sua **Wallet Seed** para poder recuperar a conta  
    
# Linkando Metamask com endereço do Ganache

Ganache > copie o link para o **RPC Server**  
![Imagem do RPC server](rpcServer.png)  

Metamask > Altere de **Main Ethereum Network** para **Custom RPC**   
![Imagem da opção custom rpc](customRPC.png)  

 Escolha um nome qualquer e bote o **RPC Server** copiado do Ganache  
![Imagem de criando custom rpc](customRPCsave.png)  

Selecione o RPC Server que você acabou de criar    
![Imagem do rpc conectado](foobar.png)  

Ganache > Escolha uma das contas que você deseja utilizar no Metamask  
Bote para mostrar a **chave privada**  
![Imagem da opcao mostrar a chave](showkey.png)  

Copie a **chave privada**  
![Imagem da chave privada](privatekey.png)  

Metamask > Importe uma conta  
![Imagem da opcao importar account](importaccount.png)  

Bote a **chave privada** da conta do Ganache  
![Imagem importando conta](importaccountkey.png)  

**Tenha CERTEZA que trocou a conta para essa conta do Ganache  
Você não quer fazer esses testes em uma conta real sua**  
![Imagem trocando de conta](changeaccount.png)  

# Instalando Node.js

## Windows 10
Baixe Node.js: https://nodejs.org/en/  
Instale Node.js com as seguintes features:
* Node.js runtime  
* Npm package manager  
* Add to PATH  
* Python 2   
* Visual Studio Build Tools  

## Ubuntu

### Apt
Terminal > `sudo apt-get install nodejs` > `sudo apt-get install npm`  

### Snap
Terminal > `sudo snap install --channel=11/stable node --classic`  

Atualizar o npm  
Terminal > `sudo -i` > `sudo npm -g install npm`  

# Instalando Web3

## Ubuntu
Abra o terminal na pasta do projeto ou caminhe até ela  
Terminal > `npm init` > `npm install web3`  

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
