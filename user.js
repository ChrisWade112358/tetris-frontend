


class User {
    static allUsers = []

    constructor(user){
        this.id = user.id
        this.name = user.name
        this.password = user.password
        User.allUsers.push(this) 
    }

    static generateUsers(){
        const userData = apiService.fetchUsers()
            .then(data => 
                data.forEach(user => {
                    const newUser = new User(user);
                })
            )
    }

    

    static findUser(name, password){
        
        for(let i = 0; i < this.allUsers.length; i++){
            if(name == this.allUsers[i].name && password == this.allUsers[i].password){
                return this.allUsers[i];
                
            }
            
        }

        apiService.submitUser(name, password)
                    .then(data =>{
                        console.log(data)
                        const newUser = new User(data);
                        currentUser = newUser
                        return newUser;
                    })
    }

    static findUserByID(id){
        for(let i = 0; i < this.allUsers.length; i++){
            if(id == this.allUsers[i].id){
                return this.allUsers[i];
            }
        }

    }



    


}

    

   
