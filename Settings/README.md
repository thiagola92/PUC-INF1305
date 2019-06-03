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

**Tenha CERTEZA que trocou a conta para essa conta do Ganache, você não quer fazer esses testes em uma conta real sua**  
![Imagem trocando de conta](changeaccount.png)  

# Instalando Node.js

## Windows 10
* Baixe Node.js
 * https://nodejs.org/en/
* Instale Node.js
 * "Node.js runtime" obrigatório estar selecionado para instalação
 * "Npm package manager" recomendo estar selecionado para instalação
 * "Add to PATH" recomendo estar selecionado para instalação
 * Aceite instalar Python 2 + Visual Studio Build Tools

## Ubuntu

### Apt
* Abra o terminal
* Digite `sudo apt-get install nodejs`
* Digite `sudo apt-get install npm`

### Snap
* Abra o terminal
* Digite `sudo snap install --edge node --classic`
 * Ou escolha uma versão que você considera mais segura/estável
 * Por exemplo, `sudo snap install --channel=11/stable node --classic`

# Instalando Web3

## Ubuntu

* Abra o terminal na pasta do projeto
* Digite `npm init`
* Digite `npm install web3`

# Instalando Truffle

## Windows 10
* Abra o terminal na pasta do projeto
* Digite `npm install truffle`
 * Precisa do npm instalado e adicionado no path

### Box
**Truffle** tem o conceito de Box para integrar **Truffle** com outras Frameworks
* Para instalar **Truffle** integrado com uma Framework, escolha a Framework dentro das existentes
 * https://truffleframework.com/boxes
* Eu escolhi react
* Chame `truffle unbox react`
 * Se falhar:
 * Tenha certeza que tenha git no caminho de variáveis
 * Tenha certeza que python 2 e visual studio build tools tenha sido instalado
 * Tente `npm install -g node-gyp`
 * Tente `npm install -g windows-build-tools`
  * Se falhar verifique se ele deixou o "vs_BuildTools.exe" no diretório do seu usuário (ex: C:\Users\thiagola92\.windows-build-tools)
  * Instale/atualize você mesmo clicando duas vezes
* `npm install`

### Running
* `truffle compile`
* `truffle migrate`
* `npm run start`
 * Se não funcionar tente ir para a pasta client (`cd client`)

## Ubuntu
**NÃO CONSEGUI FAZER FUNCIONAR**

* Abra o terminal na pasta do projeto
* `npm instalal truffle@5.0.19`
        
### Box
**Truffle** tem o conceito de Box para integrar **Truffle** com outras Frameworks
* Para instalar **Truffle** integrado com uma Framework, escolha a Framework dentro das existentes
  * https://truffleframework.com/boxes
* Eu escolhi react
* Chame `truffle unbox react`
 * Se falhar:
  * `sudo -i`
  * Vá até a pasta utilizando os comandos de terminal (ex: `cd ....\fooBar`)
  * `sudo truffle unbox react`
* `npm install`
