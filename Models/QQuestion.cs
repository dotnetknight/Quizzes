using System;
using System.Collections.Generic;

namespace Quizzes.Models
{
    public partial class QQuestion
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string CorrectAnswer { get; set; }
        public string Answer1 { get; set; }
        public string Answer2 { get; set; }
        public string Answer3 { get; set; }
        public int QuizId { get; set; }
    }
}
