import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection="users")
public class User extends PanacheMongoEntity {
    public String username;
    public String password;
    public static User findByUsername(String username) {
        return find("username", username).firstResult();
    }
}
