import React  from 'react'
import {Table} from 'react-bootstrap'
import moment   from 'moment'
import '../App.css'



const AllNumbersStatistics = (props) => {

  const {lottoData, sortType} = props 

  const types = {
    number: 'number',
    distance: 'distance',
    totalHits: 'totalHits',
  }
  const sortProperty = types[sortType]

  return (

    
    <div>
      {console.log(lottoData)}

      {lottoData &&
          <Table responsive className="table-default mb-4" borderless="true" size="sm" hover="true" >
            <thead className="table-danger text-center">
                <tr>
                  <th className="text-light bg-info">Draws</th>
                  <th className="text-light bg-info">Date</th>
                  {lottoData.slice(0, 1).map(row => [...row.numbers].sort((a, b) => a.value > b.value ? 1 : -1).map((no) => <th key={no.value} className='text-warning bg-success'>{no.value}</th>))}
                </tr>
            </thead>                           
            <tbody className='fw-bold' > 
                 {lottoData.map(row =>                       
                        <tr key={row.drawNumber}>
                            <td className="text-warning bg-primary">{row.drawNumber}</td>
                            <td className="text-warning bg-success">{moment(row.drawDate).format('yyyy-MM-DD')}</td>
                            { [...row.numbers].sort((a, b) => (a[sortProperty] === b[sortProperty] ? (a.value > b.value ? 1 : -1) : (a[sortProperty] > b[sortProperty] ? 1 : -1))).map(no => 
                            no.isHit === true ? (no.isBonusNumber === true ?  
                                                        (<td className='text-primary bg-warning' key={no.value}>{no.value}<br />
                                                        (<span className='text-danger fst-italic'>{no.numberofDrawsWhenHit}</span>)<br />
                                                        (<span className='text-secondary fst-italic'>{no.totalHits}</span>)</td>) : 
                                                        (<td className='text-primary bg-greenyellow' key={no.value}>{no.value}<br />
                                                        (<span className='text-danger fst-italic'>{no.numberofDrawsWhenHit}</span>)<br />
                                                        (<span className='text-secondary fst-italic'>{no.totalHits}</span>)</td>) )
                            
                                              : (no.distance > 10 ? (<td className='text-success bg-light fw-bold' key={no.value}>{no.value}<br />(<span className='my-color-1 fst-italic'>{no.distance}</span>)<br />(<span className='text-primary fst-italic'>{no.totalHits}</span>)</td>) 
                                              : (<td className='text-success bg-light fw-bold' key={no.value}>{no.value}<br />(<span className='text-success fst-italic'>{no.distance}</span>)<br />(<span className='text-primary fst-italic'>{no.totalHits}</span>)</td>))
                            )
                          }
                        </tr>
                 )}                 
            </tbody>       
              <tr>
                  <th className="text-light bg-info">Draws</th>
                  <th className="text-light bg-info">Date</th>
                  {lottoData.slice(0, 1).map(row => [...row.numbers].sort((a, b) => a.value > b.value ? 1 : -1).map((no) => <th key={no.value} className='text-warning bg-success'>{no.value}</th>))}
              </tr>             
          </Table>  }
     </div>
  )
}

export default AllNumbersStatistics