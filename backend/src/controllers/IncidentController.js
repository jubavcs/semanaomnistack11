const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count();

        console.log(count);

        response.header('x-total-count', count['count(*)'])

        const indicents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ongs_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        return response.json(indicents);
    },
    
    async create(request, response){
        const {title, description, value} = request.body;
        
        const ongs_id = request.headers.authorization;


        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ongs_id
        });

        return response.json({id});
    },

    async delete(request, response){
        const { id } = request.params;
        const idOngAut = request.headers.authorization;

        const incident  = await connection('incidents')
            .where('id', id)
            .select('ongs_id').as('ongs_id')
            .first();

    console.log(`Header ${request.headers.authorization}`);
      console.log(`Header ${idOngAut}`);
        console.log(`Consulta do Incidente ${incident.ongs_id}`);

        if(incident.ongs_id !== idOngAut){
            return response.status(401).json({error : "Operação não permitida!"});
        }

        await connection('incidents').where('id', id).delete();
        
        return response.status(204).send;
    }

}