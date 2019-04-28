# Macro Arquitetura

|                                                       |     |
| :-:                                                   | :-: |
| dApps (Aplicação Descentralizada)                     |     |
| Conta (Carteira)                                      |     |
| **Contrato Inteligente / Regras de Negócio On-chain** | *B* |
| **Plataforma / Protocolo**                            | *B* |
| **Rede P2P (Nós)**                                    | *B* |
| Conexão (Internet / Intranet)                         |     |
|                                                       |     |

As camadas marcadas com *B* fazem parte do blockchain.  
Ethereum faz parte da camada **Plataforma / Protocolo**.  

# Contrato Inteligente
Em inglês: Smart Contract  

Diferente de um contrato no mundo real, esse contrato é completamente digital. Um contrato inteligente é um programa armazenado dentro do blockchain.  

* Imutável
  * Uma vez que o contrato inteligente é criado, ele nunca mais pode ser alterado  
* Distribuido
  * Qualquer operação do contrato inteligente precisa ser validada pela rede blockchain

Ethereum é uma rede blockchain que suporta contrato inteligente.  
Solidity é a linguagem para criar esses contratos inteligentes.  

Ethereum foi criado pensando em contratos inteligentes.  
Solidity foi criado especificamente para Ethereum.  

Um contrato muitas vezes é visto como "quando condição X ocorrer, faça y". Esse é justamente a ideia do programa armazenado no blockchain, quando ele perceber que as condições do contrato ser comprido ocorreram ele pode executar a tarefa a qual está programado.  

# EVM (Ethereum Virtual Machine)
Se você conhece Java, deve conhece JVM (Java Virtual Machine).  
Você escreve na linguagem Java, compila para byte code que o JVM consiga entender e o JVM interage com aquele computador (Linux, MAC, Windows) consiga entender.  

A mesma coisa vale para o EVM, você escreve um contrato inteligente que ao ser compilado, O EVM consegue interpretar.  
Você consegue escrever um contrato inteligente em Solidity ou Serpent ou outra linguagem que o EVM conheça.  

# Máquina de Estado
Blockchain funciona que nem uma máquina de estado, dada uma transição você sai do estado A para o estado B.  

* Mudança de estado tem custo...  
  * No caso da rede Ethereum, o esforço que uma máquina teve que fazer para mudar o estado da rede blockchain é chamado de **Gas**.  
  * Você tem que pagar quem teve o trabalho de fazer essa mudança de estado no blockchain, por isso qualquer mudança custa **ether**.  
  * Contratos mais complexos custam mais **gas** pois as máquinas tem mais trabalho, ou seja, custam mais **ether** também.  
* Consultar informação não custa **gas**.  

Você pode descobrir mais sobre o gasto de gas na página 25 de:  
https://ethereum.github.io/yellowpaper/paper.pdf  
Video falando mais sobre o assunto:  
https://www.youtube.com/watch?v=yFb2nuUUDX0  

# Ether

1 wei == 1  
1 szabo == 1e12  
1 finney == 1e15  
1 ether == 1e18  