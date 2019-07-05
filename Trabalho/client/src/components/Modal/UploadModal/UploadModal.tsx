import * as React from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';

// const sasa = require("../../../assets/templates/templateJogador")
// import sasa from "../../../assets/templates/templateJogador.xlsx";


interface UploadModalProps {
    isOpen: boolean;
    title: string;
    bodyText: string;
    i18n: any;
    accept: string;
    exportIsVisible: boolean;
    toggle: () => void;
    exportAction: () => any;
    importAction: () => any;
    cancelAction: () => void;
    onChange: () => any;
}
interface UploadModalState {
    templateLink: string;
}

class UploadModal extends React.Component<UploadModalProps, UploadModalState> {
    constructor(props: UploadModalProps) {
        super(props)
        this.state = {
            templateLink: ""
        }

    }
   async componentDidMount() {
        const templateLink = await this.props.exportAction();
        this.setState({templateLink})
    }
    render(){
        const { props } = this
        return (
    <Modal isOpen={props.isOpen} >
        <ModalHeader >{props.title}</ModalHeader>
        <ModalBody>
            {props.bodyText}
            <br/>
            { this.props.exportIsVisible &&
                <Button href={this.state.templateLink} download={"template.xlsx"} color="link">
                    <i className="material-icons form-actions__icon">cloud_download</i> 
                    {props.i18n.t("common:button.export")}
                </Button> 
            }
            <br/>
            <br/>
            <input id="file-upload" type="file" name="fileUpload" accept={this.props.accept} onChange={props.onChange()}  />
        </ModalBody>
        <ModalFooter>
            <Button outline color="danger" onClick={() => props.cancelAction()}>
            <i className="material-icons form-actions__icon">cancel</i>
            {props.i18n.t("common:button.cancel")}
            </Button>
            <Button outline color="success" onClick={() => props.importAction()}>
            <i className="material-icons form-actions__icon">cloud_upload</i>
            {props.i18n.t("common:button.upload")}
            </Button>
        </ModalFooter>
    </Modal>)}
}
export default UploadModal;
