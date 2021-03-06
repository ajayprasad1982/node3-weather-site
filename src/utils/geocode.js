const request=require('postman-request')

const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYWpheWN0YyIsImEiOiJjazZldm94cHIwNmQ5M3Fvanp4b3F6bnRtIn0.FZlQ2fjoI33eFpuUMDNHPw"
    request({url,json:true},(error,{body}={})=>{
    
        if(error){
            callback("unable to connect geocode location",undefined)
        }else if(!body.features ||body.features.length==0){
           callback("Unable to find location,please try another search",undefined)
        }else{
            const data=body.features[0];
       
        callback(undefined,{
            latitude:data.center[1],
            longitude:data.center[0],
            location:data.place_name
        })
        }
    })
}
module.exports=geocode