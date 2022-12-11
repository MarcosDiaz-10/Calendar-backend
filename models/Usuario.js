import { Schema, model } from "mongoose";


const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
UsuarioSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
 
     object.uid = _id;
     return object;
 })
 
export default model('Usuario', UsuarioSchema);