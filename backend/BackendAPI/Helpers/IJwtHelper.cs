namespace BackendAPI.Helpers
{
    public interface IJwtHelper
    {
        string GenerateToken(Models.User user);

    }
}
