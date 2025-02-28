import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

import java.util.List;

@MongoEntity (collection="games")
public class Game extends PanacheMongoEntity {
    public String name;
    public List<String> startevents;

    public static Game findByName(String name) {
        return find("name", name).firstResult();
    }
}

