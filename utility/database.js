import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;

const mongoConnect = async (callback) => {
   const client = await MongoClient.connect('mongodb+srv://hassanhussien13579:TlTqXukOzGlsVrMC@cluster0.tdik0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
   callback(client);
}

export default mongoConnect;
//mongodb+srv://hassanhussien13579:TlTqXukOzGlsVrMC@cluster0.tdik0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
