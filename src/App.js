import './App.css'
// import { useState, useEffect, createContext, useContext, useRef, useCallback, useMemo   } from "react"
import { useState, useEffect } from "react"
import useFetch from "./pages/useFetch"
import styled from 'styled-components'

import BC49 from './lottos/BC49'
import BC49AllNumbersStatistics from './lottos/BC49AllNumbersStatistics'


const Styles = styled.div`
  padding: 1rem;

  table {
    alignment:center;
    border-spacing: 1;
    border: 1px solid black;
    align-items: center;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 1;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`


function App() {

  let url = 'http://localhost:9090/api/lottonumbers?lottoname=1'

  //let url = 'http://localhost:9090/api/bc49'


  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const [pageSize, setPageSize] = useState(10)
  const [{data, json}] = useFetch(url, page, pageSize)

  const pageLimit = 10

  const getPaginationGroup = ()  => {
    let start = Math.floor((page - 1) / pageLimit) * pageLimit
    let array = new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
    return array
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent)
    setPage(pageNumber)
  }

  function goToNextPage() {
    setPage((page) => page + 1)
    
  }

  function goToPreviousPage() {
    setPage((page) => page - 1)
  }



  
  useEffect(() => {
    
    var o = JSON.parse(json)
    setTotalPages((totalPages) =>  totalPages = o.totalCount)

  }, [json, pageSize])

  return (
    <Styles>
      <h2>BC49</h2>
      <div className="card">
        <div className="card-body">       
        {
            <div className="container-fluid">
 
                {/* {console.log(data)} */}
   
                {data !== null ? (
                <>
                  {/* <BC49 lottoData={data}/>  */}
                  <BC49AllNumbersStatistics lottoData={data}/>

                  <div className="row">
                    <div className="col-lg-3">
                    <span className='margin-right'>Select </span>
                      <select id="rpp" className="dropdown btn btn-primary  dropdown-toggle"  onChange={(e) => setPageSize(e.target.value)}>
                      <option class="dropdown-item" value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                      </select>
                      <span className='margin-left'>records per page</span>
                        
                    </div>
                    <div className="col-lg-9">
                    <button 
                      type="button"
                      onClick={goToPreviousPage}
                      className={`prev btn btn-primary ${page === 1 ? 'disabled' : ''}`}
                    >Prev</button>

                    {getPaginationGroup().map((item, index) => (
                        <button 
                        type="button"
                        key={index}
                        onClick={changePage}
                        className={`paginationItem btn btn-secondary ${page === item ? 'active' : null}`}
                        >
                        <span>{item}</span>
                        </button>
                    ))}

                    <button 
                      type="button"
                      onClick={goToNextPage}
                      className={`next btn btn-primary ${page === totalPages ? 'disabled' : ''}`}
                      >Next</button>
</div>
                  </div>
                </>
                
                  ) : (
                  <h1>No data to display</h1>
                  )}

            </div>   
        }                         

        </div>
      </div>
    </Styles>
  )
}

export default App
