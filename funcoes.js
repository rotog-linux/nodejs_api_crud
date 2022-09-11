module.exports = {
    checarCampo: (campo) => {
        if (campo === undefined){
            return false;
        }

        if (campo.length === 0){
            return false;
        }

        return true;
    },
    checarID: (id, con) => {
        if (id === undefined){
            return false;
        }
        if (con === undefined){
            return false;
        }
        var sql = "SELECT id FROM clientes_tb WHERE id = " + mysql.escape(id);
        con.query(sql, (err, result) => {
            if (err) throw err;
            return (!Object.keys(result).length === 0);
        });
    }
}