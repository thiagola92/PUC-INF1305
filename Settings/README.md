# Instalando Ganache 

## Windows 10
* Baixe Ganache
  * https://truffleframework.com/ganache
* Instale Ganache
  * Se o seu windows 10 não reconhecer o formato .appx
    * Abra a Microsoft Store
    * Instale App Installer
    
## Ubuntu
* Baixe Ganache
  * https://truffleframework.com/ganache
* Para abrir o formato .AppImage você precisa tornar executável
  * Botão direito na aplicação
  * Na tab "permissions"
  * Marque "allow executing file as program" 

# Instalando Metamask

## Chrome
* Instale a extensão Metamask para o Chrome
  * https://metamask.io/
* Se registre no Metamask
  * Salve em algum lugar seguro sua "Wallet Seed"
    
# Linkando Metamask com endereço do Ganache
* Abra o **Metamask**
* Altere a Network clicando em "Main Ethereum Network" (Default)  
* Selecione "Custom RPC"   
![Imagem da opção custom rpc](customRPC.png)  
* Abra o **Ganache**
* Pegue o link para o RPC Server no Ganache  
![Imagem do RPC server](rpcServer.png)  
* No **Metamask** termine de criar e salve  
![Imagem de criando custom rpc](customRPCsave.png)  
* Selecione o seu RPC para conectar  
![Imagem do rpc conectado](foobar.png)  
* Agora você quer botar uma dessas contas do **Ganache** no **Metamask**
* Para importar você precisa da chave privada de uma das contas
* Isso pode ser obtido no **Ganache**
* Procure a conta a qual você quer se conectar como
* Clique no simbolo da chave para exibir a chave privada  
![Imagem da opcao mostrar a chave](showkey.png)  
* Copie essa chave privada  
![Imagem da chave privada](privatekey.png)  
* No **Metamask** clique na sua conta  
* Selecione importar conta  
![Imagem da opcao importar account](importaccount.png)  
* Importe com essa chave privada  
![Imagem importando conta](importaccountkey.png)  
* Tenha **CERTEZA** que trocou a conta para essa conta do **Ganache**  
  * Você não quer fazer esses testes em uma conta real sua  
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

### Snap
* Abra o terminal
* `sudo snap install --edge node --classic`

### Apt
* Abra o terminal
* `sudo apt-get install nodejs`
* `sudo apt-get install npm`

# Instalando Truffle

## Windows 10
* Abra o cmd ou powershell
* Digite `npm install -g truffle`
  * Precisa no npm instalado e no adicionado no path

### Box
**Truffle** tem o conceito de Box para integrar **Truffle** com outras Frameworks
* Para instalar **Truffle** integrado com uma Framework, escolha a Framework dentro das existentes
  * https://truffleframework.com/boxes
* Eu escolhi react
* Chame ``truffle unbox react`
  * Se falhar:
    * Tenha certeza que tenha git no caminho de variáveis
    * Tenha certeza que python 2 e visual studio build tools tenha sido instalado
    * Tente `npm install -g node-gyp`
    * Tente `npm install -g windows-build-tools`
      * Se falhar verifique se ele deixou o "vs_BuildTools.exe" no diretório do seu usuário (ex: C:\Users\thiagola92\.windows-build-tools)
      * Instale/atualize você mesmo clicando duas vezes

### Running
* `truffle compile`
* `truffle migrate`
* `npm run start`
  * Se não funcionar tente ir para a pasta client (`cd client`)

## Ubuntu
* Abra o terminal
* `sudo npm install -g truffle`
  * Se falhar:
    * `sudo npm install -g truffle --scripts-prepend-node-path`
    * Se falhar:
      * Tente baixar uma versão mais velha
      * `sudo npm install -g truffle@5.0.19 --scripts-prepend-node-path`
