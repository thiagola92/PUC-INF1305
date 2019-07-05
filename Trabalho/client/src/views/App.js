import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Samples from "./contracts/Samples.json"
import getWeb3 from "./utils/getWeb3";
import Database from './db/database';
import FileBase64 from 'react-file-base64';
import * as PropTypes from "prop-types";
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
import UploadModal from './components/Modal/UploadModal/UploadModal';
import "./App.css";
//import './App.scss';
import InputFiles from 'react-input-files';

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, fileUpload: null, files: [] };

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
      this.setState({ web3, accounts, contract: instance });

      Database.connect();

    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });

  };

  handleSubmit(event) {
    event.preventDefault();

    const file = this.input.current.files[0];
    const reader = new FileReader();

    if(!file)
      return;

    reader.onloadend = (event) => {
      const text = event.target.result;
      const hash = this.state.web3.utils.keccak256(text);
      console.log(text);
      console.log(hash);

      const { accounts, contract } = this.state;
      contract.methods.addSampleOwner(hash).send({
        from: accounts[0]
      });

      Database.addSampleOwner(hash, accounts);
    }

    reader.readAsText(file);
  }

  onChange(files) {
    if(!files)
      return;

    this.setState({fileUpload: files})
    console.log(files)
    console.log(files[0])

    const reader = new FileReader();
    console.log(reader);

    reader.onloadend = (f) => {
      const hash = this.state.web3.utils.keccak256(f.target.result);
      console.log(hash);
    }
    reader.readAsText(files[0])
  }

  getFiles(files){
    this.setState({ files: files })
    console.log(files)
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
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
        <Row>
          <Col sm='8'>
            
              <div>The stored value is: {this.state.storageValue}</div>

              <form onSubmit={e => this.handleSubmit(e)}>
                <label>
                  Sample:
                  <input type="file" ref={this.input} />
                </label>
                <input type="submit" value="Submit" />
              </form>

              <InputFiles onChange={f => this.onChange(f)}>
                <button>Upload</button>
              </InputFiles>

              {/* <a href = {this.state.fileUpload[0].name} download>Click to download</a> */}

              <FileBase64
                multiple={ true }
                onDone={ this.getFiles.bind(this) } />

              {this.state.files[0] ?
                <a href = {this.state.files[0].base64} download = 'Teste.jpeg'>Click to download</a>
              : 'Não tem nada'}
          </Col>
      </Row>
    </React.Fragment>
    </div>
    );
  }
}

export default App;
