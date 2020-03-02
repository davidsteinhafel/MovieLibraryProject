using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            var movie = _context.Movies;
            if (movie == null)
            {
                return BadRequest();
            }
            return Ok(_context.Movies);
        }

        // GET api/movie/5
        [HttpGet("{id:int}")]
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
            _context.Movies.Add(value);
            _context.SaveChanges();
        }

        // PUT api/movie/5
        [HttpPut]
        public void Put(int id, [FromBody]Movie movie)
        {
            // Update movie in db logic
            var movieOnDb = _context.Movies.Single(x => x.MovieId == id);
         
            movieOnDb.Director = movie.Director;
            movieOnDb.Genre = movie.Genre;
            movieOnDb.Title = movie.Title;
            _context.SaveChanges();
        }

        // DELETE api/movie/5
        [HttpDelete]
        public void Delete(int id)
        {
            // Delete movie from db logic
            var movieOnDb = _context.Movies.Single(x => x.MovieId == id);
            _context.Movies.Remove(movieOnDb);
            _context.SaveChanges();
        }
    }
}