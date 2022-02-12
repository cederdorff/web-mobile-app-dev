class UserService {
    #url;
    #users;

    constructor() {
        this.url = "https://raw.githubusercontent.com/cederdorff/web-mobile-app-dev/main/data/users.json";
        this.users = [];
    }

    async fetchUsers() {
        const response = await fetch(this.url);
        let users = await response.json();
        users = this.sortByName(users);
        this.users = users;
        return this.users;
    }

    async getUsers() {
        if (this.users.length === 0) {
            await this.fetchUsers();
        }
        return this.users;
    }

    async getUser(id) {
        if (this.users.length === 0) {
            await this.fetchUsers();
        }
        const userData = this.users.find(user => user.id == id);
        return userData;
    }

    sortByName(users) {
        return users.sort((user1, user2) => {
            return user1.name.localeCompare(user2.name);
        });
    }
}

const userService = new UserService();

export default userService;
