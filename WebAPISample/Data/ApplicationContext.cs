using Microsoft.EntityFrameworkCore;
using WebAPISample.Models;

namespace WebAPISample.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data - needs migration
            // modelBuilder.Entity<Movie>
            //  .HasData(
            //  new Movie{Fill All Properties}
            //  );
            // View PlayerTracker project for example
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Movie>()
                .HasData(
               new Movie { Title = "The Departed", Genre = "Drama", Director = "Martin Scorsese" },
               new Movie { Title = "The Dark Knight", Genre = "Drama", Director = "Christopher Nolan" },
               new Movie { Title = "Inception", Genre = "Drama", Director = "Christopher Nolan" },
               new Movie { Title = "Pineapple Express", Genre = "Comedy", Director = "David Gordon Green" },
               new Movie { Title = "Die Hard", Genre = "Action", Director = "John McTiernan" });
        }

        public DbSet<Movie> Movies { get; set; }
    }
}
