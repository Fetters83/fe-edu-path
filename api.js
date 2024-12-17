import axios from 'axios'

export const getAverageAttendance = async ()=>{

    try {

        const result  = await axios.get(`https://be-edu-path.onrender.com/api/academicMetrics/averageAttendance`,{
            params:{
                yearGroup:6,
    
            }
        })
    
     
        return result.data.averageAttendance
        
    } catch (error) {

        console.log(error)
        
    }

 
}

export const getStudentById = async (id) =>{
    try {
        const result = await axios.get(`https://be-edu-path.onrender.com/api/students/${id}`)
        return result.data
        
    } catch (error) {
        
    }
    
}

export const editStudentById = async (id,updatedStudent) =>{
    console.log(updatedStudent)
    try {
        const result = await axios.patch(`https://be-edu-path.onrender.com/api/students/${id}`,
            {updatedStudent}
        )
        return result.data
        
    } catch (error) {
        console.log(error)
    }
    
}



export const getBehaviorIncidents = async ()=>{

    try {
        
        const result  = await axios.get(`https://be-edu-path.onrender.com/api/behavioralMetrics/incidentRate`,{
            params:{
                yearGroup:1 ,
            }
        })
        return result.data
    } catch (error) {
        console.log(error)
    }

    
 
    
}

export const getBehaviorLogs = async ()=>{

    try {
        
        const result = await axios.get(`https://be-edu-path.onrender.com/api/behavior-logs`)
        return result.data


    } catch (error) {
        console.log(error)
    }

    
}

export const getSuggestions = async ()=>{

    try {
        
        const result = await axios.get(`https://be-edu-path.onrender.com/api/suggestions`)
        return result.data


    } catch (error) {
        console.log(error)
    }

    
}


export const getResolutionRates = async ()=>{

    try {
        const result = await axios.get(`https://be-edu-path.onrender.com/api/behavioralMetrics/resolutionRate`,{
            params:{
                academicYear:"2021/22",
                yearGroup:6
            }
        })
    
       
        return(result.data)
        
    } catch (error) {
        console.log(error)
    }


}

 export const getTop5Behaviors = async (params)=>{

    try {
        const result = await axios.get(`https://be-edu-path.onrender.com/api/behavioralMetrics/top5BehaviorIncidents`,{params} )
       
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

export const getKS1GradeDistributionData = async (params)=>{

    try {
        const result = await axios.get(`https://be-edu-path.onrender.com/api/academicMetrics/gradeDistribution/ks1`,{params})
        return result.data
    } catch (error) {
        
    }
}

export const getKS2GradeDistributionData = async (params)=>{

    try {
        const result = await axios.get(`https://be-edu-path.onrender.com/api/academicMetrics/gradeDistribution/ks2`,{params})
        console.log(result.data)
        return result.data
    } catch (error) {
        
    }
}