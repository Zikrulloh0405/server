export const users = [
    {
        id: 1,
        userEmail: "test1@gmail.com",
        password: "qwerty1",
        followers: [],
        following: [],
        profileImage: "",
    },
    {
        id: 2,
        userEmail: "test2@gmail.com",
        password: "qwerty2",
        followers: [],
        following: [],
        profileImage: "",
    }
]

export const posts = [
    {
        id: 1,
        userId: 1,
        postImage: 'Post 1',
        postTitle: 'Post Title',
        postDesc: 'Post Description',
        likes: [],
        // comments : []
    }
]
export const comments = [
    {
        id: 1,
        userId: 1,
        postId: 1,
        comment: ''
    }
]


export const userMethods = {
    checkCred({ userEmail, password }) {
        return users.find((user) => user.userEmail === userEmail && user.password === password)
    }
}

export const postMethods = {
    createPost: (input) => {
        const newPost = { ...input, id: new Date(), likes: [] }
        posts.push(newPost)
        return newPost
    }
}