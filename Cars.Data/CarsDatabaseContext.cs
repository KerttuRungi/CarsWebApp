using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Cars.Core.Entities;



namespace Cars.Data
{
    public class CarsDatabaseContext : DbContext
    {   public CarsDatabaseContext(DbContextOptions<CarsDatabaseContext> options)
            : base(options) { }
        public DbSet<Car> Cars { get; set; }
    }
}
