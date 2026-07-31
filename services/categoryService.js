const db = require('../db/database'); 

const categoryService = {
    
    getAll: () => {
       
        return db.prepare('SELECT DISTINCT category AS name FROM products').all();
    },
    

    count: () => {
        
        const result = db.prepare('SELECT COUNT(DISTINCT category) as total FROM products').get();
        return result.total;
    },

    count: () => {
        const result = db.prepare('SELECT COUNT(*) as total FROM categories').get();
        return result.total;
    }
   
};

module.exports = categoryService;