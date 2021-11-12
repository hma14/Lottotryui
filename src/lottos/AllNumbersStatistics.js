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
                  <th className="text-light bg-primary">Draws</th>
                  <th className="text-light bg-info">Date</th>
                  {props.lottoData.slice(0, 1).map(row => row.numbers.map((no) => <th key={no.number}>{no.number}</th>))}
                </tr>
            </thead>                           
            <tbody> 
                 {props.lottoData.map(row =>                       
                        <tr key={row.drawNumber}>
                            <td className="text-light bg-primary">{row.drawNumber}</td>
                            <td className="text-light bg-info">{moment(row.drawDate).format('yyyy-MM-DD')}</td>
                            {row.numbers.map(no => 
                            no.isHit === true ? (<td className='text-primary bg-warning' key={no.number}>{no.number}({no.distance})(<span className='text-danger fst-italic'>{no.numberofDrawsWhenHit}</span>)(<span className='text-dark fst-italic'>{no.totalHits}</span>)</td>) 
                                              : (no.distance > 10 ? (<td className='text-success bg-light' key={no.number}>{no.number}(<span className='text-danger fst-italic fw-bold'>{no.distance}</span>)(<span className='text-primary fst-italic'>{no.totalHits}</span>)</td>) 
                                              : (<td className='text-success bg-light' key={no.number}>{no.number}(<span className='text-success fst-italic fw-bold'>{no.distance}</span>)(<span className='text-primary fst-italic'>{no.totalHits}</span>)</td>))
                            )}   
                        </tr>
                 )}                 
            </tbody>                    
          </Table>  }
     </div>
  )
}

export default AllNumbersStatistics