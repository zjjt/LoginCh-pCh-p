const schema=`

type Query{
            client(nom:String,prenom:String,birthDate:Int,numpolice:Int):[IDENT]
        }
type IDENT{
    LOGIN:String
    MOT_DE_PASSE:String
    NOM_COMPLET:String
    DATE_NAISSANCE:Int
    NUMERO_POLICE:Int
    TELEPHONE:String

}
schema{
    query:Query
}

`;
export default schema;