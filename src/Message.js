import React, { Component } from 'react'
import Highlighter from "react-highlight-words";
import Entity from './Entity';

class Message extends Component {
    constructor(){
        super();
    }
    
    render() {
        const { message }  = this.props;
        return (
            <div style={{textAlign:'left'}}>
              
              <span style={{display:'inline',fontSize:'18px'}}>{message.senderType}</span> :   
              <span style={{display:'inline',fontSize:'20px',backgroundColor:message.sentiment === 'positive' ? '#3CB371' : (message.sentiment === 'negative' ? '#ff504d' : 'white')}}>  
                    <Highlighter
                        highlightClassName="highlight"
                        searchWords={message.keyPhrases}
                        autoEscape={true}
                        textToHighlight={message.content}
                    />
              </span>
              
              <br/> <br/>

            
            </div>
        )
    }
}
export default Message;