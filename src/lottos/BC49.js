import React  from 'react'
import {Table} from 'react-bootstrap'
import moment   from 'moment'
import '../App.css'



function BC49 (props) {
  
  return (

    <div>
      {console.log(props.lottoData)}
      {props.lottoData &&

          <Table className="table table-striped mt-4 mb-4" striped bordered hover size="sm">
            <thead>
                <tr>
                  <th>Draw Number</th>
                  <th>Draw Date</th>
                  <th>No. 1</th>
                  <th>No. 2</th>
                  <th>No. 3</th>
                  <th>No. 4</th>
                  <th>No. 5</th>
                  <th>No. 6</th>
                  <th>Bonus</th>
                </tr>
            </thead>                           
            <tbody> 
                 {props.lottoData.map(row =>                       
                        <tr key={row.drawNumber}>
                            <td>{row.drawNumber}</td>
                            <td>{moment(row.drawDate).format('yyyy-MM-DD')}</td>
                            <td>{row.number1}</td>
                            <td>{row.number2}</td>
                            <td>{row.number3}</td>
                            <td>{row.number4}</td>
                            <td>{row.number5}</td>
                            <td>{row.number6}</td>
                            <td>{row.bonus}</td>                               
                        </tr>)
                }                 
            </tbody>                    
          </Table>  }
     </div>
  )
}

export default BC49