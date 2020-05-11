const request=require("postman-request")

const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=5f9d97b7a79ef4a6645e04388b896916&query="+latitude+","+longitude;
    request({url,json:true},(error,{body})=>{
       if(error){
        callback("Unable to connect weather service",undefined)  
       }else if(body.error){
        callback(body.error.info,undefined)
       }
       else{
      
       const {temperature:temp,feelslike:fl,humidity:hm}=body.current
       callback(undefined,body.current.weather_descriptions[0]+". It is currently "+temp+" degrees out.It is feels like "+fl+" degrees out.Humidity is "+hm+"%"
         )
       }
    })
}
    module.exports=forecast