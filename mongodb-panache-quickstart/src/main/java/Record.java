import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection = "records")
public class Record extends PanacheMongoEntity {
    public String userID;
    public String game;
    public long gamePlayID;
    public String event;
    public String valence;
    public String activity;
    public String timestamp;
}
