using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Quizzes.Models
{
    public partial class QUsers
    {
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter your name")]
        public string FirstName { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter your lastname")]
        public string LastName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [DataType(DataType.EmailAddress)]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
        public string Email { get; set; }

        [Required(AllowEmptyStrings = false)]
        [DataType(DataType.Password)]
        [MinLength(6, ErrorMessage = "Password must be 6 or more characters long")]
        public string PasswordHash { get; set; }
    }
}
