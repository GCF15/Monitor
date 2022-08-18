import axios from 'axios'

export default class ApipsService {

  getapistate(url){
    var checkUrl = "http://192.168.158.17:31729/api/MonitoredService?url="+url
    return (axios.get(checkUrl));
  }
  
  getCheckItem(){
    var healthCheckItemUrl = "http://192.168.158.17:30872/api/MonitoredService"
    return (axios.get(healthCheckItemUrl));
  }
  
  getCheckItemById(id) {
    var healthCheckItemUrl = "http://192.168.158.17:30872/api/MonitoredService/"+id
    return (axios.get(healthCheckItemUrl));
  }
  
  addCheckItem(body) {
    var healthCheckItemUrl = "http://192.168.158.17:30872/api/MonitoredService/add"
    return (axios.post(healthCheckItemUrl,body));
  }
    
  deleteCheckItemById(id){
    var healthCheckItemUrl = "http://192.168.158.17:30872/api/MonitoredService/delete/" + id
    return (axios.get(healthCheckItemUrl));
  }
    
  updateCheckItem(body) {
    var healthCheckItemUrl = "http://192.168.158.17:30872/api/MonitoredService/update"
    return (axios.post(healthCheckItemUrl, body));
  }
      
}