const db = require('../util/database');

module.exports = class User{
    constructor(id,email,password){
        this.id=id;
        this.email=email;
        this.password=password;
    }

    static find(email,password){
        return db.execute('select * from user where email = ? and password = ?',[email,password]);
    }
    static fetchAll() {
        return db.execute('SELECT * FROM user');
    }

    static post(email,password) {
        // console.log(email);
        // console.log(password);
        return db.execute('Insert into user (email, password) Values (?,?)', [email,password]);
    }

    static update(id,email,password){
        return db.execute('update user set email = ? , password = ? where id = ?', [email,password, id]);
    }

    static delete(id){
        return db.execute('delete from user where id = ?', [id]);
    }
};