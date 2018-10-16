using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Quizzes.Models
{
    public partial class QQuizzes
    {
        public int Id { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string Title { get; set; }
        [Required(AllowEmptyStrings = false)]
        public int CategoryId { get; set; }
        public string OwnerId { get; set; }
    }
}
