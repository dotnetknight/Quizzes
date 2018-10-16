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
    public class CategoriesController : Controller
    {
        private readonly VegaContext _context;
        public CategoriesController(VegaContext context) { _context = context; }

        [HttpGet, Authorize]
        public IActionResult GetCategories()
        {
            var Categories = _context.QCategories.ToList();
            if (Categories != null) { return Ok(Categories); } else { return NotFound(); }
        }
    }
}
