import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const [data, setData] = useState([])
  const [temp, setTemp] = useState([])
  const [day, setDay] = useState([])
  const [weather, setWeather] = useState([])
  const [date, setdate] = useState ()
  const [description, setDescription] = useState()
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    axios(
        "https://api.openweathermap.org/data/2.5/onecall?lat=43.651070&lon=-79.347015&units=metric&exclude=minutely,alerts&appid=dedc0c24c4859b96fa57ae3a30ccc44a",
      )
      .then(res => {
        const getData = res.data
        const temperature = res.data.current.temp
        const getWeather = res.data.current.weather
        const getDay = res.data.daily
        const getDate = res.data.current.dt
        setData(getData)
        setTemp(temperature)
        setWeather(getWeather)
        setDay(getDay)
        setdate(getDate)
        setDescription(weather[0].description)
        setLoading(true)
  
      })
      .catch(err => {console.log(err)})
      return () => {
        console.log('Cleanup - didUnMount()')
    }

  }, [data]);

  useEffect(() => {
    localStorage.setItem("weather", Array(weather))

  }, [weather])


  const d = new Date(date * 1000);
  const dayName = days[d.getDay()];
  const monName = months[d.getMonth()];
  const currentDate = monName +" " +d.getDate() + " " + d.getFullYear();
  function getIcon(icon){ return "http://openweathermap.org/img/wn/" + icon + "@2x.png"}
  

        return (

        <div class="container-fluid px-1 px-md-4 py-5 mx-auto" >
          <div class="row d-flex justify-content-center px-3">
              <div class="card " id="wrapper-bg">   

              {loading == false ? 
              (<h1>Wait...</h1>)
              : 
              (
                <>
                <div class="textalign" style={{marginTop: 20, color: 'white'}}>    
                  <h1>{dayName}</h1>
                  <p class="ml-auto mr-4 mb-0 med-font">{description}</p>
                  </div>
                  <div style={{color: 'white'}}>
                  <div style = {{float: 'right', marginTop: 40}}>
                      <h1 class="ml-auto mr-4 large-font" style = {{marginRight: 15}}>{Math.round(temp)}°C</h1>
                      </div>
                      <div>
                      <img class="element" style={{marginLeft: 30}} src={getIcon(day[0].weather[0].icon)} alt={getIcon(day[0].weather[0].icon)} />
                      <h4 class="ml-auto mr-4 mt-3 mb-0" style={{marginLeft: 5}}>{data.timezone}</h4>
                      <p class="ml-4 mb-4" style={{marginLeft: 30}}>{currentDate}</p>
                      
                  </div>

                </div>
              {/** Main Daily*/}

          
              <div class = "cardbody border-top border-bottom text-center" style={{marginTop: 30}}>
                <div class="row">
                  <div class="col-2">
                    <strong class="d-block mb-2">Today</strong>
                    <img class="element" src={getIcon(day[0].weather[0].icon)} alt={getIcon(day[0].weather[0].icon)} />
                    <strong>{Math.round(temp)}°C</strong>
                  </div>

                  <div class="col-2">
                    <strong class="d-block mb-2">{days[(new Date(day[1].dt * 1000)).getDay()]}</strong>
                    <img class="element" src={getIcon(day[1].weather[0].icon)} alt={getIcon(day[1].weather[0].icon)} />
                    <strong>{Math.round(day[1].temp.day)}°C</strong>
                  </div>

                  <div class="col-2">
                    <strong class="d-block mb-2">{days[(new Date(day[2].dt * 1000)).getDay()]}</strong>
                    <img class="element" src={getIcon(day[2].weather[0].icon)} alt={getIcon(day[2].weather[0].icon)} />
                    <strong>{Math.round(day[2].temp.day)}°C</strong>
                  </div>

                  <div class="col-2">
                    <strong class="d-block mb-2">{days[(new Date(day[3].dt * 1000)).getDay()]}</strong>
                    <img class="element" src={getIcon(day[3].weather[0].icon)} alt={getIcon(day[3].weather[0].icon)} />
                    <strong>{Math.round(day[3].temp.day)}°C</strong>
                  </div>

                  <div class="col-2">
                    <strong class="d-block mb-2">{days[(new Date(day[4].dt * 1000)).getDay()]}</strong>
                    <img class="element" src={getIcon(day[4].weather[0].icon)} alt={getIcon(day[4].weather[0].icon)} />
                    <strong>{Math.round(day[4].temp.day)}°C</strong>
                  </div>

                  <div class="col-2">
                    <strong class="d-block mb-2">{days[(new Date(day[5].dt * 1000)).getDay()]}</strong>
                    <img class="element" src={getIcon(day[5].weather[0].icon)} alt={getIcon(day[5].weather[0].icon)} />
                    <strong>{Math.round(day[5].temp.day)}°C</strong>
                  </div>
                </div>

                </div>
              </>
                     
              )
            
            } 
              
        

              </div>
          </div>
      </div>
        );
      }

export default App;
