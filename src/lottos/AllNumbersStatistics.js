import React  from 'react'
import {Table} from 'react-bootstrap'
import moment   from 'moment'

import '../App.css'



const AllNumbersStatistics = (props) => {

  const {lottoData, sortType} = props 

  console.log(sortType)

  const types = {
    number: 'number',
    distance: 'distance',
    totalHits: 'totalHits',
  }
  const sortProperty = types[sortType]

  const getBgColors = (sortType, distance) => {
    if (sortType === types.distance)
    {
      switch(distance)
      {
        case 1: return 'distanceBgColor1 text-success fw-bold'
        case 2: return 'distanceBgColor2 text-success fw-bold'
        case 3: return 'distanceBgColor3 text-success fw-bold'
        case 4: return 'distanceBgColor4 text-success fw-bold'
        case 5: return 'distanceBgColor5 text-success fw-bold'
        case 6: return 'distanceBgColor6 text-success fw-bold'
        case 7: return 'distanceBgColor7 text-success fw-bold'
        case 8: return 'distanceBgColor8 text-success fw-bold'
        case 9: return 'distanceBgColor9 text-success fw-bold'
        case 10: return 'distanceBgColor10 text-success fw-bold'
        case 11: return 'distanceBgColor11 text-success fw-bold'
        case 12: return 'distanceBgColor12 text-success fw-bold'
        case 13: return 'distanceBgColor13 text-success fw-bold'
        case 14: return 'distanceBgColor14 text-success fw-bold'
        case 15: return 'distanceBgColor15 text-success fw-bold'
        case 16: return 'distanceBgColor16 text-success fw-bold'
        case 17: return 'distanceBgColor17 text-success fw-bold'
        case 18: return 'distanceBgColor18 text-success fw-bold'
        case 19: return 'distanceBgColor19 text-success fw-bold'
        case 20: return 'distanceBgColor20 text-success fw-bold'
        case 21: return 'distanceBgColor21 text-success fw-bold'
        case 22: return 'distanceBgColor22 text-success fw-bold'
        case 23: return 'distanceBgColor23 text-success fw-bold'
        case 24: return 'distanceBgColor24 text-success fw-bold'
        case 25: return 'distanceBgColor25 text-success fw-bold'
      }
    }
    else{
      return  'text-success bg-light fw-bold'
    }
  }

  
  
 

  return (

    
    <div className="tableFixHead">
      {console.log(lottoData)}

      {lottoData &&
          <Table responsive className="table-default mb-4 tableFixHead" borderless="true" size="sm" hover="true" >
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
                            
                                              : (no.distance > 10 ? (<td className={getBgColors(sortType, no.distance)}  key={no.value}>{no.value}<br />(<span className='my-color-1 fst-italic'>{no.distance}</span>)<br />(<span className='text-primary fst-italic'>{no.totalHits}</span>)</td>) 
                                              : (<td className={getBgColors(sortType, no.distance)} key={no.value}>{no.value}<br />(<span className='text-success fst-italic'>{no.distance}</span>)<br />(<span className='text-primary fst-italic'>{no.totalHits}</span>)</td>))
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