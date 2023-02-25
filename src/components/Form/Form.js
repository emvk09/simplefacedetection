import React from 'react';
import 'tachyons';
import './Form.css'

const Form= () =>{
    return(
        <div className='tc'>
            <p className= "f4">
                {`This simple tool will detect your faces. Give it a try.`}
            </p>
            <div className= "f4 flex justify-center">
                <div className= "formcss flex justify-center pa4 br3 shadow-5">
                    <input className= "w-70" type= 'text'/>
                    <button className=" w-30 link grow white bg-light-purple pointer">Detect</button>
                </div>
            </div>
        </div>
    );
}

export default Form;