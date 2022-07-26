import axios from 'axios'

export default class ApipsService {

  getapistate(url){
    var checkUrl = "http://192.168.158.17:31729/api/Health?url="+url
    return (axios.get(checkUrl));
  }
      
}