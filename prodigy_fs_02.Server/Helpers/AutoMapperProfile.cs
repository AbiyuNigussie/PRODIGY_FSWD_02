using AutoMapper;
using prodigy_fs_02.Server.Entity;
using prodigy_fs_02.Server.Models;

namespace prodigy_fs_02.Server.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() {
            CreateMap<User, UserModel>();
            CreateMap<RegisterUser, User>();
            CreateMap<UpdateUser, User>();
            CreateMap<RegisterEmployee, Employee>();
            CreateMap<UpdateEmployee, Employee>().ReverseMap();
            
        }
    }
}
