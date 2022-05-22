// import React from 'react';
// import {Toast,Row,Col } from 'react-bootstrap';

// function ToastComponent(props) {

//     return (
//       <Row>
//         <Col xs={6}>
            
//           <Toast onClose={props.onclose} show={props.show} delay={props.delay} autohide={props.autohide}>
//             <Toast.Header>
//               <img
//                 src="holder.js/20x20?text=%20"
//                 className="rounded mr-2"
//                 alt=""
//               />
//               <strong className="mr-auto">{props.title}</strong>
//               <small>1 mins ago</small>
//             </Toast.Header>
//             <Toast.Body>Thank You </Toast.Body>
//           </Toast>
//         </Col>
    
//       </Row>
//     );
//   }
// export default ToastComponent;
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastComponent(props){
    const notify = () => toast.success("Thank You");

    return (
      <div>
     
        <ToastContainer   position="bottom-right" />
      </div>
    );
  }

  export default ToastComponent;