import React from 'react';

function History (props) {
    const history = props.history.slice();

    return (!props.gameOver)
        ? <div className="container text-center margin-top-20 margin-bottom-100"> {
            history.map((ele, index) => {
                return  <div key={index} className="margin-top-10">
                            <div><span>Row: {parseInt(ele.position/3)+1} Col: {ele.position%3+1}</span></div>
                            <div>                        
                                <button className="btn blue" onClick={() => props.goBackToMovement(index)}>
                                    Reverse movement {index+1}
                                </button>
                            </div>     
                        </div>     
            })
        } </div>
        : "";   
}
export default History;