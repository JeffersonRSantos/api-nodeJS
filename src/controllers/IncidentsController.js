const connection = require('../database/connection');

module.exports = {
    async index (request, response){
        //carregar 5 por página
        const { page = 1 } = request.query;
        //pegar quantidade de registros
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            //pegar tudo que estiver na tabela ongs, onde o incidents.ong_id seja igual ao ongs.id
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
    async create (request, response){
        const { title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const id = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },
    async delete (request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        console.log(incident.ong_id);

        if(incident.ong_id !== ong_id){
            return response.status(401).json({error: 'Operação com erro.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}