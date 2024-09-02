using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace prodigy_fs_02.Server.Models
{
    public class UpdateEmployee
    {
       
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string Phone { get; set; }
        public string? JobTitled { get; set; }
        public DateTime? HireDate { get; set; }
        public decimal? Salary { get; set; }
        public string? Department { get; set; }
    }
}
