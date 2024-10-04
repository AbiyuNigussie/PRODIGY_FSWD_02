using System.ComponentModel.DataAnnotations;

namespace prodigy_fs_02.Server.Models
{
    public class AuthUser
    {
        [Required]
        public string? UserName { get; set; }
       
        [Required]
        public string? Password { get; set; }
    }
}
