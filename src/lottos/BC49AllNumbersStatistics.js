import React  from 'react'
import {Table} from 'react-bootstrap'
import moment   from 'moment'
import '../App.css'



function BC49AllNumbersStatistics (props) {
  
  return (

    
    <div>
      {/* {console.log(props.lottoData)} */}
      {props.lottoData &&
          <Table className="table table-striped mt-4 mb-4 -striped -highlight" striped  bordered hover size="sm">
            <thead>
                <tr>
                  <th>Draws</th>
                  <th>Date</th>
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
                            <td>{row.drawNumber}</td>
                            <td>{moment(row.drawDate).format('yyyy-MM-DD')}</td>
                            {row.numbers.map(no => 
                            <td key={no.number}>{no.number}({no.distance})</td>
/*                             
        {if (no.isHit === true)
                            {
                                <td key={no.number}>{no.number}({no.distance})({no.numberofDrawsWhenHit})</td>
                            }
                            else
                            {
                                <td key={no.number}>{no.number}({no.distance})</td>                                                             
                            }
                            }
 */                     
                            )}   
                        </tr>
                 )}                 
            </tbody>                    
          </Table>  }
     </div>
  )
}

export default BC49AllNumbersStatistics