import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.bson.types.ObjectId;

import java.net.URI;
import java.util.List;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    @GET
    @Path("/search/{username}")
    public User search(String username) {
        return User.findByUsername(username);
    }

    @POST
    public Response create(User user) {
        user.persist();
        return Response.created(URI.create("/users/" + user.id)).build();
    }
    //Testing
    @GET
    public List<User> list() {
        return User.listAll();
    }

    @GET
    @Path("/{id}")
    public User get(String id) {
        return User.findById(new ObjectId(id));
    }

    @PUT
    @Path("/{id}")
    public void update(String id, User user) {
        user.update();
    }
    //Testing
    @DELETE
    @Path("/{id}")
    public void delete(String id) {
        User user = User.findById(new ObjectId(id));
        user.delete();
    }
    @DELETE
    public void deleteAll(){
        User.deleteAll();
    }
}
