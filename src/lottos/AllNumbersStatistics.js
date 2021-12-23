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

  const getBgColors = (sortType, distance) => {
    if (sortType === types.distance)
    {
      switch(distance)
      {
        case 1: return 'bg-color1 text-success fw-bold'
        case 2: return 'bg-color2 text-success fw-bold'
        case 3: return 'bg-color3 text-success fw-bold'
        case 4: return 'bg-color4 text-success fw-bold'
        case 5: return 'bg-color5 text-success fw-bold'
        case 6: return 'bg-color6 text-success fw-bold'
        case 7: return 'bg-color7 text-success fw-bold'
        case 8: return 'bg-color8 text-success fw-bold'
        case 9: return 'bg-color9 text-success fw-bold'
        case 10: return 'bg-color10 text-success fw-bold'
        case 11: return 'bg-color11 text-success fw-bold'
        case 12: return 'bg-color12 text-success fw-bold'
        case 13: return 'bg-color13 text-success fw-bold'
        case 14: return 'bg-color14 text-success fw-bold'
        case 15: return 'bg-color15 text-success fw-bold'
        case 16: return 'bg-color16 text-success fw-bold'
        case 17: return 'bg-color17 text-success fw-bold'
        case 18: return 'bg-color18 text-success fw-bold'
        case 19: return 'bg-color19 text-success fw-bold'
        case 20: return 'bg-color20 text-success fw-bold'
        case 21: return 'bg-color21 text-success fw-bold'
        case 22: return 'bg-color22 text-success fw-bold'
        case 23: return 'bg-color23 text-success fw-bold'
        case 24: return 'bg-color24 text-success fw-bold'
        case 25: return 'bg-color25 text-success fw-bold'
        default: return 'bg-color1 text-success fw-bold'
      }
    }
    else{
      return  'text-success bg-light fw-bold'
    }
  }

  const getColors = (number) => {
    if (number.isHit === true)
    {
      if (number.isBonusNumber === true) 
      {
        return (
            <td className='text-primary bg-color10' key={number.value}>{number.value}<br />
            (<span className='text-danger fst-italic'>{number.numberofDrawsWhenHit}</span>)<br />
            (<span className='text-secondary fst-italic'>{number.totalHits}</span>)</td>
          )
      }
      else {
        return (
            <td className='text-primary bg-greenyellow' key={number.value}>{number.value}<br />
            (<span className='text-danger fst-italic'>{number.numberofDrawsWhenHit}</span>)<br />
            (<span className='text-secondary fst-italic'>{number.totalHits}</span>)</td>
          )
      }
    }
    else {
      if (number.distance > 10)
      {
        return (
            <td className={getBgColors(sortType, number.distance)}  key={number.value}>{number.value}<br />
            (<span className='my-color-1 fst-italic'>{number.distance}</span>)<br />
            (<span className='text-primary fst-italic'>{number.totalHits}</span>)</td>
          )
      }
      else {
        return (
            <td className={getBgColors(sortType, number.distance)} key={number.value}>{number.value}<br />
            (<span className='text-success fst-italic'>{number.distance}</span>)<br />
            (<span className='text-primary fst-italic'>{number.totalHits}</span>)</td>
          )
      }      
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
                            { [...row.numbers].sort((a, b) => (a[sortProperty] === b[sortProperty] ? 
                              (a.value > b.value ? 1 : -1) : 
                              (a[sortProperty] > b[sortProperty] ? 1 : -1))).map(no => getColors(no))}
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