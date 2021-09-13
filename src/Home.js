import React, { Component } from 'react'
import { InputGroup , FormControl , Button,Accordion,Table, ListGroup} from 'react-bootstrap'
import Message from './Message';
import axios from 'axios';

 class Home extends Component {
     constructor(){
         super();
         this.state={
             messages:[],
             engagementId:'',
             postiveSetimentScore:'',
             negativeSetimentScore:'',
             ner:{}
         }
     }

     getEngagement = () =>{
        axios.get(`http://localhost:8080/analyze/v1?engagementId=`+this.state.engagementId)
      .then(res => {
        const messages = res.data.messages;
        const ner = res.data.ner;
        const postiveSetimentScore = res.data.positiveSentimentCount;;
        const negativeSetimentScore = res.data.negativeSentimentCount;
        this.setState({ ner:ner,messages:messages,postiveSetimentScore:postiveSetimentScore,negativeSetimentScore:negativeSetimentScore });
      })
  
     }
     handleChange = (event) => {
      this.setState({engagementId: event.target.value});
     }

    
    render() {
        return (
            <div className='container'>
              
                 <InputGroup className="mb-3">
    <FormControl
      placeholder="Enter EngagementID Here"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
      value={this.state.engagementId} onChange={this.handleChange}
    />
    <Button variant="outline-secondary" id="button-addon2" onClick={this.getEngagement.bind(this)}>
      Search
    </Button>
  </InputGroup>
  {this.state.messages.length>0 && 
  <Accordion defaultActiveKey="0" flush>
  <Accordion.Item eventKey="0">
    <Accordion.Header>Engagement Details : Summary of the chat</Accordion.Header>
    <Accordion.Body>
          <span  className='tableData' style={{display:'inline',fontSize:'20px',width:'40%',textAlign:'left',}}> EngagementID:{this.state.engagementId}</span>
          <span style={{display:'inline',fontSize:'20px',width:'40%',textAlign:'right',}}>Total No of Messages: {this.state.messages.length} </span>
          <span style={{display:'inline',fontSize:'20px',width:'40%',float:'right'}}>Overall Sentiment {this.state.postiveSetimentScore>this.state.negativeSetimentScore ? <p style={{fontSize:'200%'}}>&#128522;</p> : (this.state.postiveSetimentScore<this.state.negativeSetimentScore ? <p style={{fontSize:'200%'}}>&#128530;</p> : <p style={{fontSize:'200%'}}>&#128528;</p>)} </span>   
        <br/>
        <Table>
        <tr>
          <td style={{textAlign:'left',fontSize:'17px'}}>Messages with Neutral Sentiments: <b>{this.state.messages.length-(this.state.negativeSetimentScore+this.state.postiveSetimentScore)}</b></td>
          <td style={{textAlign:'left',fontSize:'17px'}}>Messages with postive sentiments: <b>{this.state.postiveSetimentScore}</b></td>
          <td style={{textAlign:'left',fontSize:'17px'}}>Messages with Negative Sentiments: <b>{this.state.negativeSetimentScore}</b></td>
        </tr>
        <br/>
        <tr>
          <td style={{textAlign:'left',fontSize:'17px'}}><div style={{width:((this.state.messages.length-(this.state.negativeSetimentScore+this.state.postiveSetimentScore))/this.state.messages.length)*100+'%',backgroundColor:'grey'}}></div></td>
          <td style={{textAlign:'left',fontSize:'17px'}}><div style={{width:(this.state.postiveSetimentScore/this.state.messages.length)*100+'%',backgroundColor:'green'}}></div></td>
          <td style={{textAlign:'left',fontSize:'17px'}}><div style={{width:(this.state.negativeSetimentScore/this.state.messages.length)*100+'%',backgroundColor:'red'}}></div></td>
        </tr>
        </Table>
      <br/><br/>
      <span style={{float:'left',fontSize:'20px',color:'#0C63E7'}}>Entities Referenced in the Chat:</span>
      <br/><br/>
    
     <Table>
       <th style={{textAlign:'left',width:'10%'}}>SrNo.</th>
       <th style={{textAlign:'left',width:'20%'}}>Entity Type</th>
       <th style={{textAlign:'left',width:'70%'}}>Entities Referenced</th>
       <tr>
         <td style={{textAlign:'left',width:'10%'}}>1.</td>
         <td style={{textAlign:'left',width:'20%'}}>Product</td>
         <td style={{textAlign:'left',width:'70%'}}>{this.state.ner.Product.join(",")}</td>
         </tr>
         <tr>
         <td style={{textAlign:'left',width:'10%'}}>2.</td>
         <td style={{textAlign:'left',width:'20%'}}>DateTime</td>
         <td style={{textAlign:'left',width:'70%'}}>{this.state.ner.DateTime.join(",")}</td>
         </tr>
         <tr>
         <td style={{textAlign:'left',width:'10%'}}>3.</td>
         <td style={{textAlign:'left',width:'20%'}}>Person</td>
         <td style={{textAlign:'left',width:'70%'}}>{this.state.ner.PersonType.join(",")}</td>
         </tr>
         <tr>
         <td style={{textAlign:'left',width:'10%'}}>4.</td>
         <td style={{textAlign:'left',width:'20%'}}>Quantity</td>
         <td style={{textAlign:'left',width:'70%'}}>{this.state.ner.Quantity.join(",")}</td>
         </tr>
         <tr>
         <td style={{textAlign:'left',width:'10%'}}>5.</td>
         <td style={{textAlign:'left',width:'20%'}}>Skill</td>
         <td style={{textAlign:'left',width:'70%'}}>{this.state.ner.Skill.join(",")}</td>
         </tr>
     </Table>
     
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header>Transcript Details : Provides Detailed Sentimental Analysis on Each message</Accordion.Header>
    <Accordion.Body>
    {this.state.messages && this.state.messages.map((message,index)=>
      <Message key={index} message={message}/>
  )}
    </Accordion.Body>
  </Accordion.Item>
  
</Accordion>
    }
  
            </div>
        )
    }
}
export default Home;