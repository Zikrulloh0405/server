export const users = [
    {
      id: 1,
      userEmail: "test1@gmail.com",
      password  : "qwerty1",
      followers: [],
      following: [],
      profileImage: "",
    },
    {
      id: 2,
      userEmail: "test2@gmail.com",
      password  : "qwerty2",
      followers: [],
      following: [],
      profileImage: "",
    }
  ]
  
  export const posts = []
  export const comments = []
  
  
  export const userMethods = {
      checkCred({userEmail, password}) {
          return users.find((user) => user.userEmail === userEmail && user.password === password)
      }
  }