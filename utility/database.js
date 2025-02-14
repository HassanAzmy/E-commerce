import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;

//* the underscore(_) indicates that this will only be used internally in this file 
let _db;

export const mongoConnect = async (callback) => {
   try {
      const client = await MongoClient.connect('mongodb+srv://hassanhussien13579:TlTqXukOzGlsVrMC@cluster0.tdik0.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0');

      //* We can pass the database name, if not the one specified in the connection string (shop) is used
      //* The DB is created on the fly for the first time. We have not to define it like in SQL
      // _db = client.db('hassanDB');
      _db = client.db();
      
      callback();
   } catch(err) {
      console.log(err);
      throw err;
   }
}

export const getDB = () => {
   if(_db)
      return _db;
   throw 'No Database Found!';
}

//mongodb+srv://hassanhussien13579:TlTqXukOzGlsVrMC@cluster0.tdik0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0