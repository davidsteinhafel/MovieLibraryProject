using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IActionResult Get()
        {
            // Retrieve all movies from db logic
            var movies = _context.Movies;
            return Ok(movies);
        }

        // GET api/movie/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var movieOnDb = await _context.Movies.Where(x => x.MovieId == id).FirstOrDefaultAsync();
            if (movieOnDb == null)
            {
                return NotFound();
            }
            return Ok(movieOnDb);
        }

        // POST api/movie
        [HttpPost]
        public void Post([FromBody]Movie value)
        {
            // Create movie in db logic
        }

        // PUT api/movie/5
        [HttpPut]
        public void Put(int id, [FromBody]string value)
        {
            // Update movie in db logic
        }

        // DELETE api/movie/5
        [HttpDelete]
        public void Delete(int id)
        {
            // Delete movie from db logic
        }
    }
}