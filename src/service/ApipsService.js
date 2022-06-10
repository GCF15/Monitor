import axios from 'axios'

export default class ApipsService {
	getapipsstate(){	
        return (axios.get("http://172.25.13.5:88/api/Health?url=https://apips.appeon.com/health"));
	}
	
	getapipsinfostate(){
        return (axios.get("http://172.25.13.5:88/api/Health?url=https://apipsinfo.appeon.com/health"));
    }

    getapipsoastate() {
        return (axios.get("http://172.25.13.5:88/api/Health?url=https://apipsoa.appeon.com/health"));
    }
  
  //getapips2
}