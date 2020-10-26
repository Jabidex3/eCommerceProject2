const db = require('../util/database');

module.exports = class User{
    constructor(id,email,password,role){
        this.id=id;
        this.email=email;
        this.password=password;
        this.role=role;
    }

    static find(user){
        return db.execute('select * from user where email = ? and password = ?',[user.email,user.password]);
    }
    static fetchAll() {
        return db.execute('SELECT * FROM user');
    }

    static post(user) {
        // console.log(email);
        // console.log(password);
        return db.execute('Insert into user (email, password, role) Values (?,?,?)', [user.email,user.password,user.role]);
    }

    static update(user){
        return db.execute('update user set email = ? , password = ?, role = ? where id = ?', [user.email,user.password,user.role, user.id]);
    }

    static delete(id){
        return db.execute('delete from user where id = ?', [id]);
    }
};