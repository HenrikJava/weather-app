import React, {useContext} from 'react'
import {DataContext} from '../../shared/global/provider/DataProvider'
import {Typography} from '@material-ui/core'

export const CityInfo = () => {
    const [data, setData] = useContext(DataContext)

    function calcTime(city, offset) {
        var d = new Date();
     var localComparingToUTC = d.getTime() + (d.getTimezoneOffset() * 60000);
     var nd = new Date(localComparingToUTC + (1000*offset));
     return "The local time in " + city + " is " + nd.toLocaleString();
    }
    return(
        <div><Typography variant="h3">
        {`${data.city.name}, ${data.city.country}`}
      </Typography><Typography variant="h6">
        {calcTime(data.city.name, data.city.timezone)}
      </Typography></div>

    )
}




