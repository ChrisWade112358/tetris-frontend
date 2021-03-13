class ApiService {
    constructor(){
        this.baseUserUrl = 'http://localhost:3000/api/v1/users'
        this.baseGameUrl = 'http://localhost:3000/api/v1/games'
    }

    fetchUsers(){
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

    editUser(userObj){
        
        return fetch(`${this.baseUserUrl}/${userObj.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: userObj})
        })
        .then(resp => resp.json())
        .then(data => {
            let user = User.findUserByID(data.id)
            user.id = data.id
            user.name = data.name
            user.password = data.password
            currentUser.id = data.id;
            currentUser.name = data.name;
            currentUser.password = data.password;
            alert("User Successfuly edited.")
            

            
        })
    }

    deleteUser(id){
        return fetch(`${this.baseUserUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            let deadMan = User.allUsers.indexOf(currentUser)
            User.allUsers.splice(deadMan, 1)
            currentUser = undefined;
            alert("User Deleted. Please refresh page.")
            
        })
    }

    fetchGames(){
        return fetch(this.baseGameUrl, {
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(resp => resp.json())
    }

    submitGame(user_id, score, lines, level){
        return fetch(this.baseGameUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user_id,
                score: score,
                lines: lines,
                level: level,
                
            })
        })
        .then(function(resp){
            return resp.json()
        })
        .catch(function(error){
            alert(error)
        })
    }
}