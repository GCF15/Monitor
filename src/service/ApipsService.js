import axios from 'axios'

export default class ApipsService {

  getapistate(url){
    var checkUrl = "http://192.168.158.17:31729/api/Health?url="+url
    return (axios.get(checkUrl));
  }
  
  getCheckItem(){
    var healthCheckItemUrl = "http://192.168.158.17:30872/api/health"
    return (axios.get(healthCheckItemUrl));
  }
  
  getCheckItemById(id) {
    var healthCheckItemUrl = "http://192.168.158.17:30872/api/health/"+id
    return (axios.get(healthCheckItemUrl));
  }
  
  addCheckItem(body) {
    var healthCheckItemUrl = "http://192.168.158.17:30872/api/health/add"
    return (axios.post(healthCheckItemUrl,body));
  }
    
  deleteCheckItemById(id){
    var healthCheckItemUrl = "http://192.168.158.17:30872/api/health/delete/" + id
    return (axios.get(healthCheckItemUrl));
  }
    
  updateCheckItem(body) {
    var healthCheckItemUrl = "http://192.168.158.17:30872/api/health/update"
    return (axios.put(healthCheckItemUrl, body));
  }
      
}