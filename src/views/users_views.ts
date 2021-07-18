import User from '../models/User'

export default {
    render(user: User) {
        return {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        }    
    },

    renderMany(users:  User[]) {
        return users.map(user => this.render(user))
    }
}