import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.bson.types.ObjectId;

import java.net.URI;
import java.util.List;
@Path("/events")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class EventResource {

    @GET
    @Path("/search/{name}")
    public Event search(String name) {
        return Event.findByName(name);
    }

    //Testing
    @GET
    public List<Event> list() {
        return Event.listAll();
    }
    @GET
    @Path("/{id}")
    public Event get(String id) {
        return Event.findById(new ObjectId(id));
    }

    @POST
    public Response create(Event event) {
        event.persist();
        return Response.created(URI.create("/events/" + event.id)).build();
    }

    @PUT
    @Path("/{id}")
    public void update(String id, Event event) {
        event.update();
    }

    @DELETE
    @Path("/{id}")
    public void event(String id) {
        Event event = Event.findById(new ObjectId(id));
        event.delete();
    }



    @DELETE
    public void deleteAll(){
        Event.deleteAll();
    }
}
