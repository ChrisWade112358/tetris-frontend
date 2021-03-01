class ApiService {
    constructor(){
        this.baseUserUrl = 'http://localhost:3000/api/v1/users'
        this.baseGameUrl = 'http://localhost:3000/api/v1/games'
    }

    fetchUser(){
        return fetch(this.baseUserUrl, {
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(res => res.json())
    }

    submitUser(name, password){
        
        return fetch(this.baseUserUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                password: password,
                
            })
        })
        .then(function(resp){
            return resp.json()
        })
        .catch(function(error){
            alert(error)
        })
    }

    deleteUserFetch(id){
        return fetch(`${this.baseUserUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => console.log(data ))
    }
}