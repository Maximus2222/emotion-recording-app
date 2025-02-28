import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.bson.types.ObjectId;

import java.net.URI;
import java.util.List;

@Path("/games")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class GameResource {
    @GET
    public List<Game> list() {
        return Game.listAll();

    }
    @GET
    @Path("/search/{name}")
    public Game search(String name) {
        return Game.findByName(name);
    }
    @DELETE
    @Path("/{id}")
    public void delete(String id) {
        Game game = Game.findById(new ObjectId(id));
        List <Event> events=Event.findByGame(game.name);
        for(Event e:events){
            e.delete();
        }
        game.delete();
    }
    @DELETE
    public void deleteAll(){
        Game.deleteAll();
        Event.deleteAll();
    }
    //Testing
    @GET
    @Path("/{id}")
    public Game get(String id) {
        return Game.findById(new ObjectId(id));
    }

    @POST
    public Response create(Game game) {
        game.persist();
        return Response.created(URI.create("/games/" + game.id)).build();
    }

    @PUT
    @Path("/{id}")
    public void update(String id, Game game) {
        game.update();
    }



}
