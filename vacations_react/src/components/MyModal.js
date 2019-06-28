import React from 'react'
import Input from './input'
import CountrySelector from './CountrySelector'
import {ModalInput} from '../Jsons/ModelInputs'

import {Button , Modal} from 'react-bootstrap'
class MyModal extends React.Component {
    
    card = {
        title:'',
        location:'',
        image:'',
        start_date:'',
        end_date:'',
        price:'',
    }
    state = {
        title:'',
        location:'',
        image:'',
        start_date:'',
        end_date:'',
        price:'',
    }

    componentDidMount(){
      
    }

    createCard = (index,str) => {
      switch(index){
        case 1:
          this.card.title = str;
          break;
        case 2:
          this.card.location = str;
          break;
        case 3:
          this.card.image = str;
          break;
        case 4:
          console.log("update start " +str)
          this.card.start_date = str;
          break;
        case 5:
          this.card.end_date =  str;
          break;
        default: 
          this.card.price = str;       
      }
    }

    months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May',
      'Jun', 'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'
    ]
    createDate = (date) =>{
      let month = (date)?date.split(' ')[1]:'none'
      month = (this.months.indexOf(month)+1<10)? `0${this.months.indexOf(month)+1}`:`${this.months.indexOf(month)}`
      let year = (date)?date.split(' ')[3]:'none'
      let day = (date)?date.split(' ')[2]:'none'
      return `${year+'-'+month+'-'+day}`;
    }
    render() {
      
      var show = this.props.show
      let values = [...Object.values( this.props.card )]; 
      values[4] = this.createDate(values[4])
      values[5] = this.createDate(values[5])
      this.card = {
        id:values[0],
        title:values[1],
        location:values[2],
        image:values[3],
        start_date:values[4],
        end_date:values[5],
        price:values[6],
      } 
      
      var Inputs = ModalInput.map((input,index) => {
        return <Input 
                getText={(str) => this.createCard(index+1,str)}
                icon={input.icon} 
                type={input.type} 
                placeholder={input.placeholder} 
                text={values[index+1]}>
               </Input>
      })
      return (
        <>
          <Modal show={show} onHide={() => this.props.hide(true)}>
            <Modal.Header closeButton>
              <Modal.Title>Card edit</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
             {Inputs}
            </Modal.Body>
            <Modal.Footer>
              <Button className='saveModal' variant="primary" onClick={() => this.props.hide(this.card)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
  
  export default MyModal ;