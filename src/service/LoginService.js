export default class LoginService{
	login(email,password){
		return email===password?true:false;
	}
}