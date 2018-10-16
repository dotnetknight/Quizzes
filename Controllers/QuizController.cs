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
    public class QuizController : Controller
    {
        private readonly VegaContext _context;

        public QuizController(VegaContext context) { _context = context; }

        [HttpGet, Route("MyQuizzes"), Authorize]
        public IActionResult GetMyQuizzes()
        {
            var Quizzes = _context.QQuizzes.Where(usr => usr.OwnerId == HttpContext.User.Claims.First().Value).ToList();
            if (Quizzes != null) { return Ok(Quizzes); } else { return NotFound(); }
        }

        [HttpGet, Authorize]
        public IActionResult GetQuizzes()
        {
            var Quizzes = _context.QQuizzes.ToList();
            if (Quizzes != null) { return Ok(Quizzes); } else { return NotFound(); }
        }

        [HttpPost, Route("AddQuiz"), Authorize]
        public async Task<IActionResult> AddQuiz([FromBody] QQuizzes Quiz)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            else
            {
                Quiz.OwnerId = HttpContext.User.Claims.First().Value;
                _context.Add(Quiz);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpGet("{id}"), Authorize]
        public IActionResult GetQuizById([FromRoute] int id)
        {
            if (id != 0)
            {
                var Quiz = _context.QQuizzes.Where(q => q.Id == id);
                if (Quiz != null) { return Ok(Quiz); } else { return NotFound(); }
            }
            else { return BadRequest(); }
        }

        [HttpPut, Authorize]
        public async Task<IActionResult> UpdateQuiz([FromBody] QQuizzes Quiz)
        {
            if (ModelState.IsValid)
            {
                var QuizData = _context.QQuizzes.Where(quiz => quiz.Id == Quiz.Id).FirstOrDefault();
                if (QuizData != null)
                {
                    QuizData.Title = Quiz.Title;
                    QuizData.CategoryId = Quiz.CategoryId;

                    await _context.SaveChangesAsync();
                    return Ok(QuizData);
                }
                else { return NotFound(); }
            }
            else { return BadRequest(); }
        }

        [HttpDelete, Route("Delete/{quizId}")]
        public async Task<IActionResult> DeleteQuiz(int quizId)
        {
            var Quiz = _context.QQuizzes.Find(quizId);
            if (Quiz != null)
            {
                _context.QQuizzes.Remove(Quiz);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else { return NotFound(); }
        }
    }
}