import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment'
import '../App.css'
import classNames from 'classnames'



const PredictDraws = (props) => {

  const { lottoData, columns, numberRange } = props

  const [numbers, setNumbers] = useState(lottoData?.numbers.sort((a, b) => a.value - b.value))
  const [predicts, setPredicts] = useState([])



  useEffect(() => {
    
  }, [predicts])

  const getPredicts = (columns, numberRange) => {
    
      var min = numbers[0].value
      var max = numbers[numberRange - 1].value
      var rand = parseInt(min + (Math.random() * (max - min)))
      var predicts = []
      while (predicts.length < columns) {
        predicts.push(parseInt((min + (Math.random() * (max - min)))))
        predicts = [...new Set(predicts)]
      }
      predicts.sort((a, b) => a - b)

      return predicts
  
  }



  const getHeader = () => {
    return (
      <thead className="table-danger text-center">
        <tr>
          {Array.from(Array(10).keys()).map((no) =>
            (<th key={no} className='text-warning bg-success'>{no + 1}</th>))}
        </tr>
      </thead>
    )
  }

  const getRow = (start, end) => {

    return (
      <tr>
        {numbers
          .map(no => no.value > start && no.value <= end ?
            (<td className={classNames('bg-color', { 'bg-color8': predicts.indexOf(no.value) > -1 }, { 'bg-greenyellow': predicts.indexOf(no.value) < 0 })} key={no.value}>  
              <span className={classNames('fs-5 font-color', {'text-danger': predicts.indexOf(no.value) > -1 }, {'text-success': predicts.indexOf(no.value) < 0 })}>{no.value}   </span>
              <span className='text-primary fst-italic'>({no.distance})</span>
              <span className='my-color-2 fst-italic'>({no.totalHits})</span></td>)
            : '')}
      </tr>
    )
  }



  return (
    <div>
      {numbers &&
        <Table responsive className="table-primary mb-3"  size="lg" >
          {getHeader()}

          <tbody className='fw-bold' >

            {getRow(0, 10)}
            {getRow(10, 20)}
            {getRow(20, 30)}
            {getRow(30, 40)}
            {getRow(40, 50)}
          </tbody>

          {getHeader()}
        </Table>}

      <button
        type="button"
        onClick={() => setPredicts(getPredicts(columns, numberRange))}
        className="btn btn-primary fw-bold float-end"
      >Predict Next Draw</button>
    </div>
  )
}


export default PredictDraws