const pool = require('../db/index');

// #Todo is Create a many to may toable tha tis connecting both projects and task tables
async function createProject(){
    try{
        const response = await pool.query(
            'INSERT INTO projects (title, description, tasks) VALUES (?, ?, ?)',
            [title, description, JSON.stringify([])]
        );
        return response
    }catch(err){
        console.error("Something went wrong when creating a new project", err);
    }
}

async function fetchProject(id) {
    try{
        const response = await pool.query('SELECT * FROM projects WHERE id = ?', [id])
        return response
    }catch(err){
        console.error("Something went wrong when fetching the project", err);
    }
}

module.exports = {createProject, fetchProject};