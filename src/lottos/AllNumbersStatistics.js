import React  from 'react'
import {Table} from 'react-bootstrap'
import moment   from 'moment'
import '../App.css'



function AllNumbersStatistics (props) {

  
  return (

    
    <div>
      {/* {console.log(props.lottoData)} */}
      {props.lottoData &&
          <Table className="small table-hover table-borderless table-info mb-4 -highlight" >
            <thead className="table-danger text-center">
                <tr>
                  <th className="text-light bg-info">Draws</th>
                  <th className="text-light bg-info">Date</th>
                  {props.lottoData.slice(0, 1).map(row => row.numbers.map((no) => <th key={no.number} className='text-warning bg-success'>{no.number}</th>))}
                </tr>
            </thead>                           
            <tbody className='fw-bold'> 
                 {props.lottoData.map(row =>                       
                        <tr key={row.drawNumber}>
                            <td className="text-light bg-primary">{row.drawNumber}</td>
                            <td className="text-warning bg-success">{moment(row.drawDate).format('yyyy-MM-DD')}</td>
                            {row.numbers.sort().map(no => 
                            no.isHit === true ? (<td className='text-primary bg-warning' key={no.number}>{no.number}<br />(<span className='text-danger fst-italic'>{no.numberofDrawsWhenHit}</span>)<br />(<span className='text-dark fst-italic'>{no.totalHits}</span>)</td>) 
                                              : (no.distance > 10 ? (<td className='text-success bg-light fw-bold' key={no.number}>{no.number}<br />(<span className='my-color-1 fst-italic'>{no.distance}</span>)<br />(<span className='text-primary fst-italic'>{no.totalHits}</span>)</td>) 
                                              : (<td className='text-success bg-light fw-bold' key={no.number}>{no.number}<br />(<span className='text-success fst-italic'>{no.distance}</span>)<br />(<span className='text-primary fst-italic'>{no.totalHits}</span>)</td>))
                            )}   
                        </tr>
                 )}                 
            </tbody>       
              <tr>
                  <th className="text-light bg-info">Draws</th>
                  <th className="text-light bg-info">Date</th>
                  {props.lottoData.slice(0, 1).map(row => row.numbers.map((no) => <th key={no.number} className='text-warning bg-success'>{no.number}</th>))}
              </tr>             
          </Table>  }
     </div>
  )
}

export default AllNumbersStatistics