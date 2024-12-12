import axios from 'axios'

export const getAverageAttendance = async ()=>{

    const result  = await axios.get(`https://be-edu-path.onrender.com/api/academicMetrics/averageAttendance`,{
        params:{
            yearGroup:6,

        }
    })

 
    return result.data.averageAttendance
}




export const getBehaviorIncidents = async ()=>{

    const result  = await axios.get(`https://be-edu-path.onrender.com/api/behavioralMetrics/incidentRate`,{
        params:{
            yearGroup:1 ,
           

        }
    })
 
    return result.data
}

export const getResolutionRates = async ()=>{

    const result = await axios.get(`https://be-edu-path.onrender.com/api/behavioralMetrics/resolutionRate`,{
        params:{
            academicYear:"2021/22",
            yearGroup:6
        }
    })

   
    return(result.data)
}

 export const getTop5Behaviors = async (params)=>{

    try {
        const result = await axios.get(`https://be-edu-path.onrender.com/api/behavioralMetrics/top5BehaviorIncidents`,{params} )
        console.log(result.data.results)
        return result.data.results
    } catch (error) {
        console.log(error)
    }
  
}

export const getLowestAttenders = async (params)=>{

    try {
        const result = await axios.get(`https://be-edu-path.onrender.com/api/academicMetrics/studentLowestAttenders`,{params} )
        console.log(result.data)
        return result.data.lowest5Attenders
    } catch (error) {
        console.log(error)
    }
  
}

export const getAllStudentData = async ()=>{

    try {
        const result = await axios.get(`https://be-edu-path.onrender.com/api/students`)
        return result.data
    } catch (error) {
        
    }
}