import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.bson.types.ObjectId;

import java.net.URI;
import java.util.List;

@Path("/records")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class RecordResource {

    @POST
    public Response create(Record record) {
        record.persist();
        return Response.created(URI.create("/records/" + record.id)).build();
    }
    //Testing
    @GET
    public List<Record> list() {
        return Record.listAll();
    }

    @GET
    @Path("/{id}")
    public Record get(String id) {
        return Record.findById(new ObjectId(id));
    }



    @PUT
    @Path("/{id}")
    public void update(String id, Record record) {
        record.update();
    }

    @DELETE
    @Path("/{id}")
    public void delete(String id) {
        Record record = Record.findById(new ObjectId(id));
        record.delete();
    }

    @DELETE
    public void deleteAll(){
        User.deleteAll();
    }


}
