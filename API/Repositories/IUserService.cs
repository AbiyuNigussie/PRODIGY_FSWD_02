using prodigy_fs_02.Server.Models;
using prodigy_fs_02.Server.Entity;


namespace prodigy_fs_02.Server.Repositories
{
    public interface IUserService
    {
        IEnumerable<User> GetUsers();
        User GetUserbyId(int id);
        void PutUser(int id, UpdateUser user);
        User PostUser(User create, string Password);
        void DeleteUser(User user);
        public bool IsExist(int id);
    }
}
