import { Button, Modal, ModalProps, QRCode } from "antd";
import React from "react";
import { Wrapper } from "./styled";

type Props = ModalProps;

const QRModal = (props: Props) => {
  return (
    <Modal footer={null} {...props}>
      <Wrapper>
        <div className="heading">QR code for this page</div>
        <QRCode size={250} value={window.location.href} icon="" />
        <div>
          A QR code is a two-dimensional barcode that, when scanned using a
          smartphone or QR code reader, provides quick access to this page.
        </div>
        <div>
          You can share or print it to allow others to easily access this page.
        </div>
        <Button onClick={props.onCancel} danger type="primary" size="large">
          CLOSE
        </Button>
      </Wrapper>
    </Modal>
  );
};

export default QRModal;
