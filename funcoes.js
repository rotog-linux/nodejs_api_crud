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
    checarId: function(id, con, mysql) {
        //console.log(id);
        if (id === undefined){
            return false;
        }
        if (isNaN(id)){
            return false;
        }
        if (con === undefined){
            return false;
        }
        if (mysql === undefined){
            return false;
        }

        var sql = "SELECT * FROM clientes_tb WHERE id = " + mysql.escape(id);
        con.query(sql, (err, result) => {
            if (err) throw err;
            //console.log(Object.keys(result).length);
            //return (Object.keys(result).length > 0);
            return "1";
        });
    }
}