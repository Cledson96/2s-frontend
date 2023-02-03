import Modal from 'react-bootstrap/Modal';


export function Confirmation({ setmodal }) {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'fixed' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton className='bg-success'>
          <Modal.Title>Colaborador cadastrado com sucesso!</Modal.Title>
        </Modal.Header>

        <Modal.Footer className='bg-success'>
          <button onClick={() => { setmodal(false) }} type="button" className="btn  btn-light">OK</button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export function Error({ seterror, dataerror }) {
  let error

  if (dataerror == "motoboy já cadastrado!") {
    error = dataerror
  } else if (dataerror == "usuario já cadastrado!" || dataerror == "cliente já cadastrado!") {
    error = dataerror
  }
  else if (dataerror =="pedido já cadastrado!") {
    error = (<p>{dataerror}</p>)
   
  }else{
    error = "error"
  }
  return (
    <div
      className="modal show "
      style={{ display: 'block', position: 'fixed' }}
    >
      <Modal.Dialog  >
        <Modal.Header className='bg-danger' closeButton>
          <Modal.Title>Erro ao cadastrar!</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-danger'>
          {error}

        </Modal.Body>
        <Modal.Footer className='bg-danger'>
          <button onClick={() => { seterror(false) }} type="button" className="btn  btn-success">OK</button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}