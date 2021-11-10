import React  from 'react'
import {Table} from 'react-bootstrap'
import moment   from 'moment'
import '../App.css'



function BC49AllNumbersStatistics (props) {
  
  return (

    
    <div>
      {/* {console.log(props.lottoData)} */}
      {props.lottoData &&
          <Table className="small table-hover table-borderless table-info mb-4 -highlight" >
            <thead className="table-danger text-center">
                <tr>
                  <th className="text-light bg-primary">Draws</th>
                  <th className="text-light bg-info">Date</th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                  <th>7</th>
                  <th>8</th>
                  <th>9</th>
                  <th>10</th>
                  <th>11</th>
                  <th>12</th>
                  <th>13</th>
                  <th>14</th>
                  <th>15</th>
                  <th>16</th>
                  <th>17</th>
                  <th>18</th>
                  <th>19</th>
                  <th>20</th>
                  <th>21</th>
                  <th>22</th>
                  <th>23</th>
                  <th>24</th>
                  <th>25</th>
                  <th>26</th>
                  <th>27</th>
                  <th>28</th>
                  <th>29</th>
                  <th>30</th>
                  <th>31</th>
                  <th>32</th>
                  <th>33</th>
                  <th>34</th>
                  <th>35</th>
                  <th>36</th>
                  <th>37</th>
                  <th>38</th>
                  <th>39</th>
                  <th>40</th>
                  <th>41</th>
                  <th>42</th>
                  <th>43</th>
                  <th>44</th>
                  <th>45</th>
                  <th>46</th>
                  <th>47</th>
                  <th>48</th>
                  <th>49</th>
                </tr>
            </thead>                           
            <tbody> 
                 {props.lottoData.map(row =>                       
                        <tr key={row.drawNumber}>
                            <td className="text-light bg-primary">{row.drawNumber}</td>
                            <td className="text-light bg-info">{moment(row.drawDate).format('yyyy-MM-DD')}</td>
                            {row.numbers.map(no => 
                            no.isHit === true ? (<td className='text-danger bg-warning' key={no.number}>{no.number}({no.distance})(<span className='text-danger fst-italic fw-bold'>{no.numberofDrawsWhenHit}</span>)</td>) 
                                              : (no.distance > 10 ? (<td className='text-success bg-light' key={no.number}>{no.number}(<span className='text-danger fst-italic fw-bold'>{no.distance}</span>)</td>) 
                                              : (<td className='text-success bg-light' key={no.number}>{no.number}(<span className='text-info fst-italic fw-bold'>{no.distance}</span>)</td>))
                            )}   
                        </tr>
                 )}                 
            </tbody>                    
          </Table>  }
     </div>
  )
}

export default BC49AllNumbersStatistics