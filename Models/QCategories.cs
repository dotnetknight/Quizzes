using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Quizzes.Models
{
    public partial class QCategories
    {
        public int Id { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string Name { get; set; }
    }
}
