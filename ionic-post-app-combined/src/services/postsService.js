import userService from "./usersService";

class PostService {
    constructor() {
        this.url = "https://raw.githubusercontent.com/cederdorff/web-mobile-app-dev/main/data/posts.json";
        this.posts = [];
    }

    async fetchPosts() {
        console.log("Fetch Posts");
        const response = await fetch(this.url);
        let posts = await response.json();
        this.posts = posts;
        return this.posts;
    }

    async getPosts() {
        if (this.posts.length === 0) {
            await this.fetchPosts();
        }
        return this.posts;
    }

    async getPostsWithUserDetails() {
        if (this.posts.length === 0) {
            await this.fetchPosts();
        }
        const users = await userService.getUsers();

        const postsWithUser = this.posts.map(post => {
            const user = users.find(user => user.id === post.uid);
            post = { ...post, user: user }; // combine objects with spread operator
            delete post.uid; // delete uid - it's inside post.user.id
            return post;
        });
        return postsWithUser;
    }

    async getPost(id) {
        if (this.posts.length === 0) {
            await this.fetchPosts();
        }
        const postData = this.posts.find(p => p.id === parseInt(id));
        return postData;
    }

    async getPostsByUser(uid) {
        if (this.posts.length === 0) {
            await this.fetchPosts();
        }
        const postData = this.posts.filter(p => p.uid === parseInt(uid));
        return postData;
    }
}

const postService = new PostService();

export default postService;
