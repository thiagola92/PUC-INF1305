pragma solidity ^0.5.0;

// Referências de contratos
//https://github.com/pbrudny/learning-solidity-2018/blob/master/06_lottery_multiple_winners/06_lottery_multiple_winners.sol
//https://github.com/fabiojose/ethereum-ex/blob/master/contracts/Deal.sol
//https://github.com/thiagola92/BlockchainProject/blob/5bbcdfe858c333d646b346350bf5092163018da0/contracts/Samples.sol

contract Samples {

  // Informações gerais do contrato
  string private contract_title;
  string private contract_description;
  address payable private contract_owner_address;
  uint private contract_price_to_add_sample; // wei

  // Struct que representa as informações da Sample
  struct Sample {
    address payable sample_owner_address;
    uint sample_price; // wei

    address[] sample_buyers;
  }

  // Dado um hash, eu consigo identificar uma sample
  mapping(uint256 => Sample) private sample_list;

  // Uma compra precisa saber o comprador e qual sample foi comprada
  // struct Purchase {
  //   address customer_address;
  //   uint256 sample_bought;
  //   uint sample_price;
  // }

  // Uma lista de todas as compras de samples
  // Purchase[] private sample_purchase;

  constructor() public {
    contract_owner_address = msg.sender;
    contract_title = "Titulo do Contrato de Samples";
    contract_description = "Contrato para compra de Samples";
    contract_price_to_add_sample = 1000000000000000000 wei;
  }

  modifier isContractOwner {
    require(msg.sender == contract_owner_address, "Only the contract owner can call this");
    _;
  }

  function getContractTitle() public view returns (string memory) {
    return contract_title;
  }

  function getContractDescription() public view returns (string memory) {
    return contract_description;
  }

  function getContractOwnerAddress() public view returns (address) {
    return contract_owner_address;
  }

  function getContractPriceToAddSample() public view returns (uint256) {
    return contract_price_to_add_sample;
  }

  function getSamplePrice(uint256 sample_hash) public view returns (uint) {
    return sample_list[sample_hash].sample_price;
  }

  function getSampleOwner(uint256 sample_hash) public view returns (address) {
    return sample_list[sample_hash].sample_owner_address;
  }

  function getSampleHistoric(uint256 sample_hash) public view returns (address[] memory) {
    return sample_list[sample_hash].sample_buyers;
  }

  function setContractTitle(string memory _contract_title) public isContractOwner {
    contract_title = _contract_title;
  }

  function setContractDescription(string memory _contract_description) public isContractOwner {
    contract_description = _contract_description;
  }

  function setContractOwnerAddress(address payable _contract_owner_address) public isContractOwner {
    contract_owner_address = _contract_owner_address;
  }

  function setContractPriceToAddSample(uint _contract_price_to_add_sample) public isContractOwner {
    contract_price_to_add_sample = _contract_price_to_add_sample;
  }

  function setSamplePrice(uint256 sample_hash, uint _sample_price) public {
    require(msg.sender == sample_list[sample_hash].sample_owner_address, "Apenas o dono da sample pode alterar o preço dela");

    sample_list[sample_hash].sample_price = _sample_price;
  }

  // Adiciona uma sample no contrato
  function addSampleOwner(uint256 sample_hash, uint _sample_price) public payable {
      require(sample_list[sample_hash].sample_owner_address == address(0), "Sample já possui dono");
      require(msg.value == contract_price_to_add_sample, "Preço de adicionar sample incorreto");

      sample_list[sample_hash].sample_owner_address = msg.sender;
      sample_list[sample_hash].sample_price = _sample_price;

      contract_owner_address.transfer(msg.value);
  }

  // Compra uma sample
  function buySample(uint256 sample_hash) public payable {
    require(sample_list[sample_hash].sample_owner_address != address(0), "Sample não existe ou possui dono");
    require(sample_list[sample_hash].sample_price == msg.value, "Preço de compra da sample inválido");

    sample_list[sample_hash].sample_owner_address.transfer(sample_list[sample_hash].sample_price);

    sample_list[sample_hash].sample_buyers.push(msg.sender);
  }
}
