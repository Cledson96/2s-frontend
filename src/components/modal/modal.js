import Modal from 'react-bootstrap/Modal';


export function Confirmation({ setmodal }) {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'fixed' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Colaborador cadastrado com sucesso!</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <button onClick={() => { setmodal(false) }} type="button" class="btn  btn-success">OK</button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export function Error({ seterror, dataerror }) {
  console.log(dataerror)
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
          {dataerror == "motoboy já cadastrado!"?"motoboy já cadastrado!" : dataerror.map((ref) => {
            return( <p>{ref}</p>)
           
          })}

        </Modal.Body>
        <Modal.Footer className='bg-danger'>
          <button onClick={() => { seterror(false) }} type="button" class="btn  btn-success">OK</button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}