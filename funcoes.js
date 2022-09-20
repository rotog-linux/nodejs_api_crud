module.exports = {
    checarCampo: (campo) => {
        if (campo === undefined){
            return false;
        }

        if (campo.length === 0){
            return false;
        }

        return true;
    }
}