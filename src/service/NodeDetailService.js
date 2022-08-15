import axios from 'axios'

export default class NodeDetailService {

  getnodedetail(){
    var url = "http://192.168.158.17:31729/api/node"
    return (axios.get(url));
  }
  
  getNodeContainerDetialByName(name){
    var url = "http://192.168.158.17:31729/api/Pod/NodeName/"+name
    return (axios.get(url));
  }
  
  getNodeContainerType(){
    var url = "http://192.168.158.17:31729/api/namespace"
    return (axios.get(url));
  }
  
  filterContainerDetialByType(type){
    var url = "http://192.168.158.17:31729/api/Pod/NamespaceName/"+type
    return (axios.get(url));
  }
      
}