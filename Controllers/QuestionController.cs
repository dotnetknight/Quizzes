using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Quizzes.Models;


namespace Quizzes.Controllers
{
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {
        private readonly VegaContext _context;

        public QuestionController(VegaContext context) { _context = context; }

        [HttpPost, Authorize]
        public async Task<IActionResult> AddQuestion([FromBody] QQuestion question)
        {
            if (!ModelState.IsValid) { return BadRequest(); }
            else
            {
                await _context.QQuestion.AddAsync(question);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpGet("{quizId}"), Authorize]
        public IActionResult GetQuestions([FromRoute] int quizId)
        {
            if (quizId == 0) { return BadRequest(); }
            else
            {
                var Questions = _context.QQuestion.Where(q => q.QuizId == quizId);
                if (Questions != null) { return Ok(Questions); } else { return NotFound(); }
            }
        }

        [HttpPost, Route("CheckQuestions"), Authorize]
        public async Task<IActionResult> CheckQuestions([FromBody] QQuestion question)
        {
            var sa = _context.QQuestion.Where(a => a.CorrectAnswer == question.CorrectAnswer).FirstOrDefault();
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut, Authorize]
        public async Task<IActionResult> UpdateQuestion([FromBody] QQuestion Question)
        {
            if (ModelState.IsValid)
            {
                var QuestionData = _context.QQuestion.Where(q => q.Id == Question.Id).FirstOrDefault();
                if (QuestionData != null)
                {
                    QuestionData.Text = Question.Text;
                    QuestionData.CorrectAnswer = Question.CorrectAnswer;
                    QuestionData.Answer1 = Question.Answer1;
                    QuestionData.Answer2 = Question.Answer2;
                    QuestionData.Answer3 = Question.Answer3;

                    await _context.SaveChangesAsync();

                    return Ok(QuestionData);
                }
                else { return NotFound(); }
            }
            else { return BadRequest(); }
        }
    }
}
