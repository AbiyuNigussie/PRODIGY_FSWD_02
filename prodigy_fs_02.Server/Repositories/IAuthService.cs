using prodigy_fs_02.Server.Entity;
using prodigy_fs_02.Server.Models;

namespace prodigy_fs_02.Server.Repositories
{
    public interface IAuthService
    {
        User Authenticate(AuthUser auth);

        string Generate(User user);
    }
}
