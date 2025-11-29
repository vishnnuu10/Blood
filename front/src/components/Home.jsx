import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Img from './img/iii.jpeg'
import Img2 from './img/m.jpeg'
import Img3 from './img/ii.jpeg'





const Home = () => {


  
  return (


   


    <Slide>
           

              <div style ={{paddingTop:"1px",paddingBottom:"1px"}}>
             
                <br></br>
            <div className="each-slide-effects">
            <img src={Img} alt="" height="550" Width="1050" />
               
                
            </div>
           </div>
           <div style ={{paddingTop:"1px"}}>
    
           <br></br>
            <div className="each-slide-effect">
          
                <img src={Img2} alt="" height="550" Width="1050"/>
                <br></br>
             
                
            </div>
            </div>
            <div style ={{paddingTop:"1px"}}>
           
            <br></br>
            <div className="each-slide-effectss">
            
            <img src={Img3} alt=""  height="550" Width="1050"/>
            
         
            </div>
                    </div>
         
        
        </Slide>
 




     
     

  


  )
}

export default Home