const http = require("http");

let users = [
    { id: 1, name: "Mona", age: 30 },
    { id: 2, name: "Karim", age: 21 },
    { id: 3, name: "Laila", age: 27 },
];

let posts = [
    { id: 1, title: "New Title1", description: "New Description1" },
    { id: 2, title: "New Title2", description: "New Description2" },
    { id: 3, title: "New Title3", description: "New Description3" },
];

const server = http.createServer((req, res) => {

    res.setHeader("content-type", "Application/json");

    if (req.url == "/users") {
        if (req.method == "GET") {
            res.end(JSON.stringify(users));
        } else if (req.method == "POST") {
            req.on("data", (data) => {
                let newUser = JSON.parse(data);
                let isExisted = users.find((user) => user.id == newUser.id);
                if (isExisted) {
                    res.end(JSON.stringify({ message: "Operation rejected, user with the same ID already registered!" }));
                } else {
                    users.push(newUser);
                    res.end(JSON.stringify([]));
                }
            });
        }
        else if (req.method == "DELETE") {
            req.on("data", (data) => {
                let { id } = JSON.parse(data);
                let isExisted = users.find((user) => user.id == id);
                if (isExisted) {
                    users = users.filter((user) => user.id != id);
                    res.end(JSON.stringify([]));
                } else {
                    res.end(JSON.stringify({ message: "User not found!" }));
                }
            });
        }
        // Update users 
        else {
            req.on("data", (data) => {
                let updatedUser = JSON.parse(data);
                let index = users.findIndex((user) => user.id == updatedUser.id);
                if (index !== -1) {
                    users[index] = updatedUser;
                    res.end(JSON.stringify([]));
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ message: "User not found!" }));
                }
            });
        }
    }
    else if (req.url == "/posts") {
        if (req.method == "GET") {
            res.end(JSON.stringify(posts));
        } else if (req.method == "POST") {
            req.on("data", (data) => {
                let newPost = JSON.parse(data);
                let isExisted = posts.find((post) => post.id == newPost.id);
                if (isExisted) {
                    res.end(JSON.stringify({ message: "Operation rejected, post with the same ID already registered!" }));
                } else {
                    posts.push(newPost);
                    res.end(JSON.stringify([]));
                }
            });
        }
        else if (req.method == "DELETE") {
            req.on("data", (data) => {
                let { id } = JSON.parse(data);
                let isExisted = posts.find((post) => post.id == id);
                if (isExisted) {
                    posts = posts.filter((post) => post.id != id);
                    res.end(JSON.stringify([]));
                } else {
                    res.end(JSON.stringify({ message: "Post not found!" }));
                }
            });
        }
        // Update post
        else {
            req.on("data", (data) => {
                let updatedPost = JSON.parse(data);
                let index = posts.findIndex((post) => post.id == updatedPost.id);
                if (index !== -1) {
                    posts[index] = updatedPost;
                    res.end(JSON.stringify([]));
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ message: "Post not found!" }));
                }
            });
        }
    }
    else {
        res.end(JSON.stringify({ message: "Invalid endpoint." }));
    }
});

server.listen(3000, () => console.log('Server is running at LocalHost5200...'));
