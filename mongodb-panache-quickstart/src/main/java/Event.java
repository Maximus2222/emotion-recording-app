import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

import java.util.List;

@MongoEntity (collection = "events")
public class Event extends PanacheMongoEntity {
    public String name;
    public String game;
    public List<String> successors;
    public static Event findByName(String name) {
        return find("name", name).firstResult();
    }
    public static List<Event> findByGame(String game) {return find("game", game).list(); }
}
