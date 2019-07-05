import React, { Component } from "react";
import Samples from "./contracts/Samples.json"
import getWeb3 from "./utils/getWeb3";
import Database from './db/database';
import './App.scss';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Breadcrumb, BreadcrumbItem,
} from "reactstrap";
// import FileBase64 from 'react-file-base64';
// import * as PropTypes from "prop-types";
// import UploadModal from './components/Modal/UploadModal/UploadModal';
// import "./App.css";
// import InputFiles from 'react-input-files';
//import {Link} from 'react-router-dom';

// deletar essa linha, ela foi feita apenas para dar commit

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,

    owner_sample_name: "",

    new_sample_price: 1000000000000000000, // wei
    new_sample_name: "",
    new_sample_hash: "",

    info_sample_hash: "",
    info_sample_historic: [],
    info_sample_price: "",
    info_sample_owner: "",
    info_sample_owner_name: "",
    info_sample_name: "",

    buy_sample_hash: "",
    buy_sample_price: "",

    contract_title: "",
    contract_description: "",
    contract_owner_address: "",
    contract_onwer_name: "",
    contract_price_to_add_sample: "",
    contract_samples: [],
  };

  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Samples.networks[networkId];
      const instance = new web3.eth.Contract(
        Samples.abi,
        deployedNetwork && deployedNetwork.address,
      );

      await Database.connect();

      this.setState({ web3, accounts, contract: instance }, this.getContractInformation);

    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  // Pega as informações do contrato
  getContractInformation() {
    this.state.contract.methods.getContractTitle().call().then(title => {
      this.setState({contract_title: title});
    });

    this.state.contract.methods.getContractDescription().call().then(description => {
      this.setState({contract_description: description});
    });

    this.state.contract.methods.getContractOwnerAddress().call().then(address => {
      this.setState({contract_owner_address: address});
      return address;
    }).then(async address => {
      const name = await Database.getAddressName(address);
      this.setState({contract_owner_name: name});
    });

    this.state.contract.methods.getContractPriceToAddSample().call().then(price => {
      this.setState({contract_price_to_add_sample: price});
    }).then(async () => {
      const sample_list = await Database.getAllSamplesInfo();
      this.setState({contract_samples: sample_list});
    });
  }

  // Registrando artista
  changeOwnerInfo(event) {
    event.preventDefault();

    Database.changeOwnerInfo(this.state.owner_sample_name, this.state.accounts[0]);
  }

  onOwnerSampleNameChange(event) {
    this.setState({owner_sample_name: event.target.value});
  }

  // Adicionando sample ao contrato
  addSampleOwner(event) {
    event.preventDefault();

    const file = this.input.current.files[0];
    const reader = new FileReader();

    if(!file)
      return;

    reader.onloadend = async (event) => {
      const { accounts, contract, new_sample_price, new_sample_name, contract_price_to_add_sample, web3 } = this.state;

      const text = event.target.result;
      const hash = web3.utils.keccak256(text);

      const price = web3.utils.toHex(new_sample_price);
      const contract_price = web3.utils.toHex(contract_price_to_add_sample);

      // https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
      contract.methods.addSampleOwner(hash, price).send({
        from: accounts[0],
        gas: 3000000,
        value: contract_price,
      }).then(() => {
        const info = {
          address: accounts[0],
          name: new_sample_name,
        }
        Database.addSampleOwner(hash, info);
        Database.uploadSample(file, hash, accounts[0]);

        this.setState({new_sample_hash: hash});
      });

    }

    reader.readAsText(file);
  }

  onNewSampleNameChange(event) {
    this.setState({new_sample_name: event.target.value});
  }

  onNewSamplePriceChange(event) {
    const sample_price = event.target.value.replace(/\s/g, '');
    this.setState({new_sample_price: sample_price});
  }

  // Informações da Sample
  getSampleInformation(event) {
    event.preventDefault();

    this.state.contract.methods.getSampleHistoric(this.state.info_sample_hash).call().then(historic => {
      let new_historic = [];

      historic.map(async address => {
        const name = await Database.getAddressName(address);
        new_historic.push({
          address: address, name: name,
        });
      })

      this.setState({info_sample_historic: new_historic});
    });

    this.state.contract.methods.getSamplePrice(this.state.info_sample_hash).call().then(price => {
      this.setState({
        info_sample_price: price,
        buy_sample_price: price,
        buy_sample_hash: this.state.info_sample_hash
      });
    });

    this.state.contract.methods.getSampleOwner(this.state.info_sample_hash).call().then(owner => {
      this.setState({info_sample_owner: owner});
      return owner;
    }).then(async owner => {
      const owner_name = await Database.getAddressName(owner);
      this.setState({info_sample_owner_name: owner_name});

      const sample_name = await Database.getSampleName(this.state.info_sample_hash);
      this.setState({info_sample_name: sample_name});
    });
  }

  onInfoSampleHashChange(event) {
    const sample_hash = event.target.value.replace(/\s/g, '');
    this.setState({info_sample_hash: sample_hash});
  }

  // Comprar direitos de uso da Sample
  buySample(event) {
    event.preventDefault();

    this.state.contract.methods.buySample(this.state.buy_sample_hash).send({
      from: this.state.accounts[0],
      gas: 3000000,
      value: this.state.buy_sample_price,
    });
  }

  onBuySampleHashChange(event) {
    const sample_hash = event.target.value.replace(/\s/g, '');
    this.setState({buy_sample_hash: sample_hash});
  }

  onBuySamplePriceChange(event) {
    const sample_price = event.target.value.replace(/\s/g, '');
    this.setState({buy_sample_price: sample_price});
  }

  // Informações do contrato
  onRequestInformation(event) {
    event.preventDefault();

    this.getContractInformation()
  }

  render() {
    if (!this.state.web3)
      return <div>Loading Web3, accounts, and contract...</div>;

    return (
      <div className="App">
      <React.Fragment>
          <Container>
          <Row className="text-center placeholders">
            <Col>
              {/* <img className="img-fluid" src={require('./assets/logo.png')} /><br /> */}
          </Col>
          </Row>
          <table className="table">
          </table>
        </Container>
        <Row>
            <Col sm="12" md={{ size: 'auto', offset: 0 }}>
              <Breadcrumb>
                <BreadcrumbItem >{"Bem vindo ao registrador de artes"}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
        </Row>
        <br/><br/>
        <Row>
          <Col sm='12'>

            <b>Registrando nome do artista</b>
            <form onSubmit={e => this.changeOwnerInfo(e)}>
              <p/>
              <label>
                Nome do Artista
                </label>
              <input type="text" value={this.state.owner_sample_name} onChange={e => this.onOwnerSampleNameChange(e)}/>
              <p/>
              <input type="submit" value="Submit" className="button"/>
            </form>

            <hr/>

            <b>Adicionando Sample ao contrato</b>
            <form onSubmit={e => this.addSampleOwner(e)}>
              <p/>
              <label>
                Upload da Sample
                <input type="file" ref={this.input} />
              </label>
              <p/>
              <label>
                Nome da Sample
              </label>
              <input type="text" value={this.state.new_sample_name} onChange={e => this.onNewSampleNameChange(e)}/>
              <p/>
              <label>
                Preço da Sample (wei)
              </label>
              <input type="text" value={this.state.new_sample_price} onChange={e => this.onNewSamplePriceChange(e)}/>
              <p/>
              <input type="submit" value="Submit" className="button"/> {this.state.new_sample_hash}
              <p/>
              {/* <Button
                          type="button"
                          color="success"
                          className="pull-right"
                          onClick={() => ''}
                        >
                          <i className="material-icons">attachment</i>
                          {"Submit"}
                </Button> */}
            </form>

            <hr/>

            <b>Informações da Sample</b>
            <form onSubmit={e => this.getSampleInformation(e)}>
              <p/>
              <label>
                Hash da Sample
              </label>
              <input type="text" value={this.state.info_sample_hash} onChange={e => this.onInfoSampleHashChange(e)}/>
              <p/>
              <div>
                <b>Nome da Sample:</b> {this.state.info_sample_name} <br/>
                <b>Endereço do dono:</b> {this.state.info_sample_owner} <br/>
                <b>Nome do dono:</b> {this.state.info_sample_owner_name} <br/>
                <b>Preço da sample:</b> {this.state.info_sample_price} <br/>
                <b>Historico:</b> <br/>
                {
                  this.state.info_sample_historic.map(comprador => {
                    return <div>{comprador.address} - {comprador.name}</div>
                  })
                }
              </div>
              <p/>
              <input type="submit" value="Buscar" className="button"/>
            </form>

            <hr/>

            <b>Comprar direitos de uso da Sample</b>
            <form onSubmit={e => this.buySample(e)}>
              <p/>
              <label>
                Hash da Sample
              </label>
              <input type="text" value={this.state.buy_sample_hash} onChange={e => this.onBuySampleHashChange(e)}/>
              <p/>
              <label>
                Pagamento (wei)
              </label>
              <input type="text" value={this.state.buy_sample_price} onChange={e => this.onBuySamplePriceChange(e)}/>
              <p/>
              <input type="submit" value="Comprar" className="button"/>
            </form>

            <hr/>

            <b>Informações do contrato</b>
            <form onSubmit={e => this.onRequestInformation(e)}>
              <p/>
              <input type="submit" value="Atualizar" className="button" />
              <p/>
              <div>
                <b>Titulo:</b> {this.state.contract_title} <br/>
                <b>Descrição:</b> {this.state.contract_description} <br/>
                <b>Endereço do dono:</b> {this.state.contract_owner_address} <br/>
                <b>Nome do dono:</b> {this.state.contract_owner_name} <br/>
                <b>Preço de adicionar sample:</b> {this.state.contract_price_to_add_sample} <br/>
                <br/>
                <b>Samples no Banco de Dados</b>
                <hr/>
                {
                  this.state.contract_samples.map(sample => {
                    return (
                      <div>
                        <b>Hash:</b> {sample[0]} <br />
                        <b>Nome:</b> {sample[1].name} <br />
                        <b>Endereço do dono:</b> {sample[1].owner} <br />
                        <b>Nome do dono:</b> {sample[1].owner_name} <br />
                        <hr />
                      </div>
                    )
                  })
                }
              </div>

            </form>
          </Col>
      </Row>
    </React.Fragment>
    </div>
    );
  }
}

export default App;
