using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Quizzes.Models
{
    public class LoginCredentials
    {
        [Required(AllowEmptyStrings = false)]
        [DataType(DataType.EmailAddress)]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        [MinLength(6)]
        [Required(AllowEmptyStrings = false)]
        public string Password { get; set; }
    }
}
