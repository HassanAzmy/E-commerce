const db = require('../utility/database');

module.exports = class Cart {
   static fetchAll() {
      return db.execute('SELECT * FROM cart');
   }

   static fetchByID(Id) {
      return db.execute('SELECT * FROM cart WHERE Id = ?', [Id]);
   }

   static async addProduct(Id, title, productPrice) {
      const [rows] = await db.execute('SELECT COUNT(*) AS count FROM cart WHERE Id = ?', [Id]);
      if(rows[0].count) {
         await db.execute('UPDATE cart SET quantity = quantity + 1 WHERE Id = ?', [Id]);
      } else {
         await db.execute(
            'INSERT INTO cart (Id, title, quantity, price) VALUES (?, ?, ?, ?)',
            [Id, title, 1, productPrice]
         );
      }
   }

   static async deleteFromCart(Id) {
      const [rows] = await db.execute('SELECT quantity FROM cart WHERE ID = ?', [Id]);
      if(rows[0].quantity <= 1) {
         await db.execute('DELETE FROM cart WHERE Id = ?', [Id]);
      } else {
         await db.execute('UPDATE cart SET quantity = quantity - 1 WHERE Id = ?', [Id]);
      }
   }
}