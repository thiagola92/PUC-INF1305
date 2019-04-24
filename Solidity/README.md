Não vou entrar em muitos detalhes, documentação explica bem melhor.  

# Versão
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

# Contrato
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

# Variável

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

# Função
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