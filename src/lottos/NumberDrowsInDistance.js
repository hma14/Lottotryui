import React  from 'react'
import { Table} from 'react-bootstrap'
import moment   from 'moment'
import '../App.css'



function NumberDrowsInDistance (props) {
  const {lottoData, rows}  = props

  const cols = 11
  const newList = Array(rows).fill(0).map(r => new Array(cols+1).fill(0))
  const columns = Array.from(Array(cols+1).keys()).slice(1, cols+1)
  

  lottoData.map((row, i) => {
    let arr = new Array(cols).fill(0)
    row.numbers.map(no => {
      if (no.isHit === true && no.numberofDrawsWhenHit < cols) {
        arr[no.numberofDrawsWhenHit] ++
      } 
    })     
    let sum = arr.reduce((a, b) => a = a + b, 0)
    let obj = [row.drawNumber, row.drawDate, ...arr.slice(1, cols), sum]  
    newList[i] = obj

    
  })

  return (

    <div>
      
      {lottoData &&
          <Table responsive className="table-primary mb-4" borderless="true" size="sm" hover="true" >
          <thead className="table-danger text-center">
              <tr>
                <th className="text-light bg-info">Draws</th>
                <th className="text-light bg-info">Date</th>
                {columns.map((no) => no < cols ? 
                (<th key={no} className='text-warning bg-success'>{no}</th>) : 
                (no === cols ? 
                  (<th className='text-light bg-info'>Sum of Hits</th>) :
                '' ))}
              </tr>
          </thead>                           
          <tbody className='fw-bold' > 
               {newList.map((row) =>                       
                  <tr key={row[0]}>                  
                      <td className="text-warning bg-primary">{row[0]}</td>
                      <td className="text-warning bg-success">{moment(row[1]).format('yyyy-MM-DD')}</td>    
                      {row.slice(2, cols+1).map(no => no > 0 ? 
                        <td className='text-danger bg-warning' key={no}>{no}</td> :
                          <td className='bg-greenyellow'></td>                                        
                      )}
                      {row[cols+1] < 4 ? 
                        <td className="text-light bg-success">{row[cols+1]}</td> :                       
                        <td className="text-warning bg-success">{row[cols+1]}</td>
                      }
                      
                      
                  </tr>
               )}                 
          </tbody>   
          <tr>
                <th className="text-light bg-info">Draws</th>
                <th className="text-light bg-info">Date</th>
                {columns.map((no) => no < cols ? 
                (<th key={no} className='text-warning bg-success'>{no}</th>) : 
                (no === cols ? 
                  (<th className='text-light bg-info'>Sum of Hits</th>) :
                '' ))}
              </tr>
    
        </Table>  }

        </div>
  )
}

export default NumberDrowsInDistance