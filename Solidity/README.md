Não vou entrar em muitos detalhes, documentação explica bem melhor.  

# Version
`pragma solidity ^0.4.0;`  

Indicar a versão é utilizado como um controle de segurança. Tudo que faz é dar erro se a versão do compilador não for a mesma.  
Isso é utilizado para que desenvolvedores deixem bem claro para quais versões fizeram testes e que não se responsabilizam por qualquer erro em outras versões.  
Em outas palavras, você poderia a qualquer momento trocar a versão e talvez continue rodando sem problema, mas quem escreveu o código não fez testes para isso.  

* `0.4.0`: Apenas versão 0.4.0
* `<0.4.0`: Versões abaixo que 0.4.0
* `<=0.4.0`: Versões abaixo ou igual a 0.4.0
* `\>0.4.0`: Versões acima que 0.4.0
* `\>=0.4.0`: Versões acima ou igual a 0.4.0
* `^0.4.0`: Versões acima ou igual a 0.4.0, porém menores que 0.5.0

Ex:  
`pragma solidity >=0.4.22;`  
`pragma solidity >=0.4.22 <0.7.0;`  

# Contract
O nome do arquivo não precisa ser o mesmo que o contrato.  

myfirstcontract.sol  

```Solidity
contract ContractName {
    //...
}
```

Um arquivo pode possuir vários contratos  

```Solidity
contract ContractName {
    //...
}

contract OtherExample {
    //...
}
```

# Variable

```Solidity
contract ContractName {
    bool a;             // boolean
    int b;              // integer
    uint c;             // unsigned integer
    address d;          // armazena o endereço de um Ethereum
    address payable e;  // mesmo que acima mas possui "transfer" e "send"
    byte f;             // Byte
    
    bytes g;            // Array the bytes
    string h;           // string UTF-8
}
```

# Function
Dependendo da versão você pode encontrar mudanças  

```Solidity
pragma solidity ^0.4.0;

contract ContractName {
    uint private id;
    
    function setName(uint newid) public {
        id = newid;
    }
    
    function getName() public returns (uint){
        return id;
    }
}
```

Recomenda botar `view` nas versões mais novas.  

```Solidity
pragma solidity ^0.5.7;

contract ContractName {
    uint private id;
    
    function setName(uint newid) public {
        id = newid;
    }
    
    function getName() public view returns (uint){
        return id;
    }
}
```

---

```Solidity
pragma solidity ^0.4.0;

contract ContractName {
    string private name;
    
    function setName(string newName) public {
        name = newName;
    }
    
    function getName() public returns (string){
        return name;
    }
}
```

Se estivesse usando string teria que utilizar `memory` nas vervsões mais novas.  

```Solidity
pragma solidity ^0.5.7;

contract ContractName {
    string private name;
    
    function setName(string memory newName) public {
        name = newName;
    }
    
    function getName() public view returns (string memory){
        return name;
    }
}
```

---

É opcional dar um nome ao retorno, ajuda em questão de documentar seu código.  

```Solidity
function get() public view returns (uint oNumeroQueFoiSorteado){
    return numeroSorteado;
}
```

# If vs Require
If usa a lógica padrão de if em computação, ou seja, se a condição for falsa ele vai para o próximo else ou continua o bloco de código.  

Require é uma maneira de lidar com erros, ou seja, se a condição for falsa toda a execução do código para e você volta para o estado anterior.  

**If** quando falso continua a execução do código.  
**Require** quando falso da rollback.  

```Solidity
if(numero > 0) {
    //...
}
```

```Solidity
require(numero > 0, "Não foi possivel executar a operação");
```

# Revert
A função `revert` retorna ao estado anterior.  
Ela é utilizada pela função `require` quando a condição é falsa.  

As duas maneiras a seguir são equivalentes  

```Solidity
if (x < 0)
    revert("Not enough Ether provided.");
```

```Solidity
require(x < 0, "Not enough Ether provided.");
```

# Assert vs Require
**Assert** consome todo o gas mesmo que lance um erro  
**Require** não gasta gas se lançar um erro  

# Constructor
Nas versões antigas uma função com o nome do contrato era o construtor.  
 
```Solidity
pragma solidity ^0.4.0;

contract GuardaLoteria {
    uint private numeroSorteado;
    
    function GuardaLoteria(uint numeroInicial) public {
        numeroSorteado = numeroInicial;
    }
}
```

Porém isso podia causar problemas em casos onde o contrato tem o nome alterado, então foi criado uma keyword para referênciar construtores.  

```Solidity
pragma solidity ^0.5.7;

contract GuardaLoteria {
    uint private numeroSorteado;
    
    constructor(uint numeroInicial) public {
        numeroSorteado = numeroInicial;
    }
}
```

# Modifier

```Solidity
modifier FOO() {
    // code here
    _;
    // or code here
}

function BAR() public FOO() {
    // normal code here
}
```


Ao linkar um modifier `FOO` com uma função `BAR`, você altera como você chama a função `BAR`.  
Agora ao invês de você chamar a função `BAR`, você chama `FOO`.  
`FOO` substitui `_` pela função `BAR` da maneira que você chamou ela.    

Em outras palavras, chamar `BAR` é equivalente a:  

```Solidity
modifier FOO() {
    // code here
    BAR();
    // or code here
}
```

---

Se o `BAR` foi chamado com algum parâmetro, esses parâmetros vão ser chamados normalmente sem você precisar escrever eles como argumentos no `FOO`.  

```Solidity
modifier FOO() {
    
    _;          // vai chamar BAR(X, Y, Z);
    
}

function BAR(int X, int Y, int Z) public FOO() {
    // normal code here
}
```

---

Você pode fazer `FOO` receber esses argumentos se você declarar eles no modifier `FOO` e na função `BAR`.  

```Solidity
modifier FOO(X, Y, Z) {
    
    _;          // vai chamar BAR(X, Y, Z);
    
}

function BAR(int X, int Y, int Z) public FOO(X, Y, Z) {
    // normal code here
}
```

Dessa maneira o modifier pode receber apenas os parâmetros que o interessa.  

---

Exemplo que faz mais sentido:  

```Solidity
pragma solidity ^0.5.7;

contract Pessoa {
    int private age = 0;
    
    function setAge(int newAge) public impossibleAge() {
        age = newAge;
    }
    
    function getAge() view public returns(int) {
        return age;
    }
    
    modifier impossibleAge() {
        _;
        if(age < 0) {
            age = 0;
        }
    }
}
```

Se você chamar `setAge(-1)` o `impossibleAge()` é executado da seguinte maneira  

```Solidity
modifier impossibleAge() {
    setAge(-1);
    if(age < 0) {
        age = 0;
    }
}
```

---  

Outro exemplo que faz mais sentido:  

```Solidity
pragma solidity ^0.5.7;

contract Pessoa {
    int private age = 0;
    
    function setAge(int newAge) public impossibleAge(newAge) {
        age = newAge;
    }
    
    function getAge() view public returns(int) {
        return age;
    }
    
    modifier impossibleAge(int age) {
        require(age >= 0, "idade inválida");
        _;
    }
}
```

Se você chamar `setAge(-1)` o `impossibleAge()` é executado da seguinte maneira  

```Solidity
modifier impossibleAge(int newAge) {
    require(newAge >= 0, "idade inválida");
    setAge(-1);
}
```

# Address
Existem dois tipos de address: `address` e `address payable`.  

* `address`
    * `address.balance`
        * A quantidade de Wei que esse endereço possui
* `address payable`
    * `address.balance`
        * A quantidade de Wei que esse endereço possui
    * `address.transfer(uint256 amount)`
        * Transfere para esse endereço uma quantidade de Wei, reverte a operação em caso de falha.
    * `address.send(uint256 amount) returns (bool)`
        * Transfere para esse endereço uma quantidade de Wei, retorna falso em caso de falha.

\* Funções de baixo nível não nos interessam no momento