import React from 'react';
import axios from 'axios';
import avatar from '../assets/avatar.svg';
import Modal from '@material-ui/core/Modal';
import voiceIcon from '../assets/voiceIcon.svg';
import Button from '@material-ui/core/Button';
import Send from "../assets/send-24px.svg"

export default function SimpleModal() {
  const [open, setOpen] = React.useState(false);

  const createUi = (data,type) => {

    if(type === 0){
      var mydiv = document.createElement("div");
      mydiv.id='mydiv';

      document.getElementById("chat").appendChild(mydiv);

      var para = document.createElement("span");
      para.innerHTML = data;
      para.style.fontSize=".8rem";
      para.style.listStyleType="none";
      para.style.justifyContent="flex-end";
      para.style.display="flex";
      para.style.color="white";
      para.style.marginBottom="1rem";
      var myimage = document.createElement("img");
      myimage.src=avatar;
      myimage.style.width="8%";
      myimage.style.justifyContent="flex-end";
      myimage.style.display="flex";
      myimage.style.float='right';
      myimage.style.marginLeft='1rem';
  
      document.getElementById("mydiv").appendChild(myimage);
      document.getElementById("mydiv").appendChild(para);

    }
    else{
      var mydiv = document.createElement("div");
      mydiv.id='mydiv';

      document.getElementById("chat").appendChild(mydiv);

      var para = document.createElement("LI");
      para.innerHTML = data;
      para.style.fontSize=".8rem";
      para.style.marginBottom="1rem";
      para.style.marginTop="-4px";
      para.style.paddingLeft='1rem';
      para.style.justifyContent="flex-start";
      para.style.display="flex";
      para.style.listStyleType="none";
      para.style.width="60%";
      para.style.color="white";
      var myimage = document.createElement("img");
      myimage.src=voiceIcon;
      myimage.style.width="10%";
      myimage.style.justifyContent="flex-start";
      myimage.style.display="flex";
      myimage.style.float='left';
      myimage.style.marginLeft='.5rem';

      document.getElementById("mydiv").appendChild(myimage);
      document.getElementById("mydiv").appendChild(para);    }


      var chatWindow = document.getElementById('chat'); 
      var xH = chatWindow.scrollHeight; 
      chatWindow.scrollTo(0, xH);
  }

  const componentDidMount=()=>{
    const inputval=document.getElementById("input").value.trim();
    createUi(inputval,0);


    axios({
        method: 'post', 
        url: 'http://localhost:4000/chat',
        data: {
          message: inputval,        
        }
      })
      .then((response) => {
        createUi(response.data.message,1);
        
      }, 
      (error) => {
        console.log(error);
      });
  }

  const styles={
      title: {fontSize:"1.25rem", fontWeight: "900", marginLeft:".4rem"},
      top: {textAlign: "center",marginTop:"-18px",backgroundColor:"orange"},
      toptext: {fontSize:"12px", textAlign: "center"},
      button:{backgroundColor:"orange", borderRadius:"30px"}
  }
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div 
      autoid = "professor-input-box"
      id="cross" 
      style={{
        height: "87.5vh",
        backgroundColor: "rgba(27,31,56,1)",
        borderTop: "1px solid orange", 
        borderLeft: "1px solid orange",
        borderBottom: "1px solid orange",
        borderRight: "1px solid orange",
        width: "23vw", 
        zIndex: 5,
        position: "absolute",
        right: "1vw",
        bottom: "5.5vh",
        overflow: "hidden"}}
      > 
      <h1 style={{color:"rgba(255,255,255,.8)", fontSize: "1rem", padding:"8px",fontWeight:"normal"}}>PROFESSOR</h1>
      <span style={{color:"white", position:"absolute", right: "40px", top:"2px", fontWeight:"bold", cursor:"pointer",fontSize:"2rem"}}>-</span>
      <span 
        autoid = "professor-close-button" 
        style={{color:"white", 
          position:"absolute", 
          right: "16px", 
          top:"16px", 
          fontWeight:"bold", 
          cursor:"pointer"}} 
          onClick={handleClose}
      >
        X
      </span>
      <div 
        autoid = "ai"
        id="chat" 
        style={{
          display:"flex",
          flexDirection:"column",
          width:"95%",
          height:"85%", 
          padding:"8px", 
          position:"relative", 
          overflowY:"auto", 
          overflowX:"hidden"}}>
      </div>
      <input 
        autoid = "human"
        id="input" 
        type="text" 
        style={{
          width: "20.6vw",
          position:"relative",
          marginTop:".5rem",
          marginLeft:"8px",
          marginBottom: "1%",
          border: "1px solid #00c0ff", 
          borderRadius:"20px",
          fontSize:".8rem", 
          padding: "8px", 
          backgroundColor: "rgba(27,31,56,.9)", 
          color: "white", }} 
        placeholder="Type here..."
      > 
      </input>
      <img 
        autoid = "professor-send-button"
        onClick={componentDidMount} 
        src={Send} 
        alt="Send" 
        style={{
          height: "3vh",
          width: "1.5vw", 
          position:"absolute", 
          right:"1.3vw", 
          bottom:"2.1vh", 
          cursor:"pointer"}}>
      </img>

    </div>
  );

  return (
    <div>
        <Button autoid = "professor-button" onClick={handleOpen} variant="contained" color="inherit" style={styles.button} size="small">
          PROFESSOR
          <img src={voiceIcon} alt = {"VoiceIcon"} style={{width: "50%", cursor:"pointer"}} height="25px">
          </img>
        </Button>
      <Modal
        open={open}
        hideBackdrop={true}
        disableAutoFocus={true}
        onBackdropClick={true}
      >
        {body}
      </Modal>
    </div>
  );
}