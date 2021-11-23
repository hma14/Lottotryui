import React  from 'react'
import {Table} from 'react-bootstrap'
import moment   from 'moment'
import '../App.css'



function LottoDraws (props) {
  const {lottoData, columns} = props 

  return (

    <div>
      
      {lottoData &&
          <Table responsive className="table-primary mb-4" borderless="true" size="sm" hover="true" striped="true">
          <thead className="table-danger text-center">
              <tr>
                <th className="text-light bg-info">Draws</th>
                <th className="text-light bg-info">Date</th>
                {lottoData.slice(0, 1).map(row => row.numbers.map((no) => (no.number < columns? 
                (<th key={no.number} className='text-warning bg-success'>{no.number}</th>) : 
                (no.number === columns ? (<th key={no.number} className='text-warning bg-success'>Bonus</th>) : ''))))}
              </tr>
          </thead>                           
          <tbody className='fw-bold' > 
               {lottoData.map(row =>                       
                  <tr key={row.drawNumber}>
                      <td className="text-warning bg-primary">{row.drawNumber}</td>
                      <td className="text-warning bg-success">{moment(row.drawDate).format('yyyy-MM-DD')}</td>
                      {[...row.numbers]
                        .sort((a, b) => (a.isBonusNumber === true && b.isBonusNumber === false && a.number > b.number ? 1 : -1)) 
                        .sort((a, b) => (a.isBonusNumber === false && b.isBonusNumber === false && a.number < b.number ? -1 : 1))
                        .map(no => no.isHit === true ?  
                          (<td className='text-primary bg-greenyellow' key={no.number}>
                          <span className='fs-5 text-primary'>{no.number}    </span>
                          (<span className='text-danger fst-italic'>{no.numberofDrawsWhenHit}</span>)
                          (<span className='text-secondary fst-italic'>{no.totalHits}</span>)</td>)
                          : '')}
                  </tr>
               )}                 
          </tbody>   
          <tr>
            <th className="text-light bg-info">Draws</th>
            <th className="text-light bg-info">Date</th>
            {lottoData.slice(0, 1).map(row => row.numbers.map((no) => (no.number < columns? 
            (<th key={no.number} className='text-warning bg-success'>{no.number}</th>) : 
            (no.number === columns ? (<th key={no.number} className='text-warning bg-success'>Bonus</th>) : ''))))}
          </tr>
    
        </Table>  }

        </div>
  )
}

export default LottoDraws